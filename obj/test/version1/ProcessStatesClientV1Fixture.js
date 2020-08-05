"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services_processstates_node_1 = require("pip-services-processstates-node");
let MESSAGE1 = {
    correlation_id: "test_processes1",
    message_id: "msg_1",
    message_type: "Order.Msg",
    sent_time: new Date(Date.now() - 2 * 3600),
    message: "Sync orders"
};
let MESSAGE2 = {
    correlation_id: "test_processes2",
    message_id: "msg_2",
    message_type: "Order.Msg",
    sent_time: new Date(Date.now() - 3600),
    message: "Copy orders"
};
let MESSAGE3 = {
    correlation_id: "test_processes3",
    message_id: "msg_3",
    message_type: "Order.Msg",
    sent_time: new Date(),
    message: "Sync orders"
};
class ProcessStatesClientV1Fixture {
    constructor(client, persistence) {
        assert.isNotNull(client);
        assert.isNotNull(persistence);
        this._client = client;
        this._persistence = persistence;
    }
    testCrudOperations(done) {
        let process1, process2;
        async.series([
            // Create process one
            (callback) => {
                this._client.startProcess(null, "Process.Type1", null, "Task.TypeX", "queue_x", MESSAGE1, 5 * 3600, (err, process) => {
                    assert.isNull(err);
                    assert.equal(process.request_id, MESSAGE1.correlation_id);
                    assert.equal(process.type, "Process.Type1");
                    assert.equal(process.status, pip_services_processstates_node_1.ProcessStatusV1.Starting);
                    assert.isNotNull(process.start_time);
                    assert.isNotNull(process.last_action_time);
                    assert.isNotNull(process.expiration_time);
                    assert.isNotNull(process.tasks);
                    assert.equal(process.tasks.length, 1);
                    assert.isNotNull(process.data);
                    process1 = process;
                    callback();
                });
            },
            // Create process two
            (callback) => {
                this._client.startProcess(null, "Process.Type1", null, "Task.TypeX", "queue_x", MESSAGE2, 2 * 3600, (err, process) => {
                    assert.isNull(err);
                    assert.equal(process.request_id, MESSAGE2.correlation_id);
                    assert.equal(process.type, "Process.Type1");
                    assert.equal(process.status, pip_services_processstates_node_1.ProcessStatusV1.Starting);
                    assert.isNotNull(process.start_time);
                    assert.isNotNull(process.last_action_time);
                    assert.isNotNull(process.expiration_time);
                    assert.isNotNull(process.tasks);
                    assert.equal(process.tasks.length, 1);
                    assert.isNotNull(process.data);
                    process2 = process;
                    callback();
                });
            },
            // Create process three
            (callback) => {
                this._client.startProcess(null, "Process.Type1", null, "Task.TypeX", "queue_x", MESSAGE3, 3 * 3600, (err, process) => {
                    assert.isNull(err);
                    assert.equal(process.request_id, MESSAGE3.correlation_id);
                    assert.equal(process.type, "Process.Type1");
                    assert.equal(process.status, pip_services_processstates_node_1.ProcessStatusV1.Starting);
                    assert.isNotNull(process.start_time);
                    assert.isNotNull(process.last_action_time);
                    assert.isNotNull(process.expiration_time);
                    assert.isNotNull(process.tasks);
                    assert.equal(process.tasks.length, 1);
                    assert.isNotNull(process.data);
                    callback();
                });
            },
            // Get all processes
            (callback) => {
                this._client.getProcesses(null, new pip_services3_commons_node_1.FilterParams(), new pip_services3_commons_node_2.PagingParams, (err, page) => {
                    assert.isNull(err);
                    assert.isNotNull(page);
                    assert.isObject(page);
                    assert.equal(page.data.length, 3);
                    callback();
                });
            },
            // Update process
            (callback) => {
                process1.comment = "Update comment";
                this._client.updateProcess(null, process1, (err, process) => {
                    assert.isNull(err);
                    assert.equal(process.comment, "Update comment");
                    assert.equal(process.id, process1.id);
                    callback();
                });
            },
            // Get process
            (callback) => {
                this._client.getProcessById(null, process1.id, (err, process) => {
                    assert.isNull(err);
                    assert.equal(process.id, process1.id);
                    callback();
                });
            },
            // Delete process
            (callback) => {
                this._client.deleteProcessById(null, process2.id, (err, process) => {
                    assert.isNull(err);
                    assert.equal(process2.id, process.id);
                    callback();
                });
            },
            // Get all processes
            (callback) => {
                this._client.getProcesses(null, new pip_services3_commons_node_1.FilterParams(), new pip_services3_commons_node_2.PagingParams, (err, page) => {
                    assert.isNull(err);
                    assert.isNotNull(page);
                    assert.isObject(page);
                    assert.equal(page.data.length, 2);
                    callback();
                });
            },
            // Try get deleted processes
            (callback) => {
                this._client.getProcessById(null, process2.id, (err, process) => {
                    assert.isNull(err);
                    assert.isNull(process);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testGetProcessbynullId(done) {
        this._client.getProcessById(null, null, (err, process) => {
            assert.isNotNull(err);
            done();
        });
    }
    testContinueProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        this._persistence.create(null, process, (err, item) => {
            assert.isNull(err);
            this._client.continueProcess(null, process, (err) => {
                assert.isNull(err);
                done();
            });
        });
    }
    testTryContinueProcessWithnotExistId(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id_not_exists";
        this._client.continueProcess(null, process, (err) => {
            assert.isNotNull(err);
            done();
        });
    }
    testTryContinueProcessWithNullId(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        this._client.continueProcess(null, process, (err) => {
            assert.isNotNull(err);
            done();
        });
    }
    testAbortProces(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        let comment = "comment";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.abortProcess(null, process, comment, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.equal(process.id, processResult.id);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Aborted, processResult.status);
                    assert.equal(comment, processResult.comment);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testContinuieWithRecoveryProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        let messageEnvelop = new pip_services_processstates_node_1.MessageV1();
        messageEnvelop.correlation_id = "corrlation id";
        messageEnvelop.message_type = "message type";
        messageEnvelop.message = "";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.continueAndRecoverProcess(null, process, "queue name", messageEnvelop, 0, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Running, processResult.status);
                    assert.equal(process.id, processResult.id);
                    assert.equal(messageEnvelop.correlation_id, processResult.recovery_message.correlation_id);
                    assert.equal(messageEnvelop.message_type, processResult.recovery_message.message_type);
                    assert.equal("queue name", processResult.recovery_queue_name);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testCompleteProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.completeProcess(null, process, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(process.id, processResult.id);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Completed, processResult.status);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testRequestForResponseProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.requestProcessForResponse(null, process, "request", "queue", new pip_services_processstates_node_1.MessageV1(), (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(process.id, processResult.id);
                    assert.equal("queue", processResult.recovery_queue_name);
                    assert.equal("request", processResult.request);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Suspended, processResult.status);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testRollbackProcessWithStatusRunning(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.rollbackProcess(null, process, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.equal(process.id, processResult.id);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Running, processResult.status);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testRollbackProcessWithStateStarting(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Starting;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.rollbackProcess(null, process, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.isNull(processResult);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testFailProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        let comment = "comment";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.failProcess(null, process, comment, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Failed, processResult.status);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testFailWithRecoveryProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        let error = "error Message";
        let messageEnvelop = new pip_services_processstates_node_1.MessageV1();
        messageEnvelop.correlation_id = "corrlation id";
        messageEnvelop.message_type = "message type";
        messageEnvelop.message = "";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.failAndRecoverProcess(null, process, error, "queue name", messageEnvelop, 0, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(process.id, processResult.id);
                    assert.equal(messageEnvelop, processResult.recovery_message);
                    assert.equal("queue name", processResult.recovery_queue_name);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testContinueForFailProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        let error = "error Message";
        let messageEnvelop = new pip_services_processstates_node_1.MessageV1();
        messageEnvelop.correlation_id = "corrlation id";
        messageEnvelop.message_type = "message type";
        messageEnvelop.message = "";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                process.recovery_message = messageEnvelop;
                this._client.failAndContinueProcess(null, process, error, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(process.id, processResult.id);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Running, processResult.status);
                    assert.isNull(processResult.recovery_message);
                    assert.isNull(processResult.recovery_queue_name);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testRepeatRecoveryProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.repeatProcessRecovery(null, process, 0, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(1, processResult.recovery_attempts);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testReturnErrorIfProcessStateDontEqualStarting(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        process.key = "key";
        process.type = "type";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.startProcess(null, "type", "key", "type", null, null, null, (err, process) => {
                    assert.isNotNull(err);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testStart(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Starting;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.startProcess(null, "type", "key", "type", null, null, null, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Starting, processResult.status);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testStartOrActivateProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Starting;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.activateOrStartProcess(null, "type", "key", "type", null, null, 0, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Starting, processResult.status);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testReturnErrorIfResumeStartedWithoutProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Starting;
        this._client.resumeProcess(null, process, "comment", (err, process) => {
            assert.isNotNull(err);
            done();
        });
    }
    testReturnErrorIfResumeStartedWithoutProcessId(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.lock_token = "token";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Starting;
        this._client.resumeProcess(null, process, "comment", (err, process) => {
            assert.isNotNull(err);
            done();
        });
    }
    testReturnErrorIfProcessTypeNull(done) {
        this._client.activateOrStartProcess(null, null, "key", "type", null, null, 0, (err, process) => {
            assert.isNotNull(err);
            done();
        });
    }
    //TODO: Need check this test!
    testReturnErrorIfProcessKeyNull(done) {
        this._client.activateOrStartProcess(null, "type", null, "type", null, new pip_services_processstates_node_1.MessageV1(), 0, (err, item) => {
            assert.isNotNull(err);
            done();
        });
    }
    testResumeWithoutCompletedTasksProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Suspended;
        process.tasks = new Array();
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.resumeProcess(null, process, "comment", (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Starting, processResult.status);
                    assert.equal("comment", processResult.comment);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testResumeWithCompletedTasksProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Suspended;
        process.tasks = new Array();
        let task = new pip_services_processstates_node_1.TaskStateV1();
        task.status = pip_services_processstates_node_1.TaskStatusV1.Completed;
        task.queue_name = "activity queue name";
        process.tasks.push(task);
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.resumeProcess(null, process, "comment", (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(pip_services_processstates_node_1.ProcessStatusV1.Running, processResult.status);
                    assert.equal("comment", processResult.comment);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testClearRecoveryMessageInProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        process.recovery_message = new pip_services_processstates_node_1.MessageV1();
        process.recovery_time = new Date();
        process.recovery_queue_name = "queue";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                });
            },
            (callback) => {
                this._client.clearProcessRecovery(null, process, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(process.id, processResult.id);
                    assert.isNull(processResult.recovery_queue_name);
                    assert.isNull(processResult.recovery_time);
                    assert.isNull(processResult.recovery_message);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testUpdateProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        process.recovery_message = new pip_services_processstates_node_1.MessageV1();
        process.recovery_time = new Date();
        process.recovery_queue_name = "queue";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                process.recovery_queue_name = "updated queue";
                this._client.updateProcess(null, process, (err, resultProcess) => {
                    assert.isNull(err);
                    assert.isNotNull(resultProcess);
                    assert.equal(resultProcess.id, process.id);
                    assert.equal(resultProcess.recovery_queue_name, process.recovery_queue_name);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
    testDeleteProcess(done) {
        let process = new pip_services_processstates_node_1.ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.locked_until_time = new Date();
        process.status = pip_services_processstates_node_1.ProcessStatusV1.Running;
        process.recovery_message = new pip_services_processstates_node_1.MessageV1();
        process.recovery_time = new Date();
        process.recovery_queue_name = "queue";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._client.deleteProcessById(null, process.id, (err) => {
                    assert.isNull(err);
                    callback();
                });
            },
            (callback) => {
                this._persistence.getOneById(null, process.id, (err, processResult) => {
                    assert.isNull(err);
                    assert.isNull(processResult);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }
}
exports.ProcessStatesClientV1Fixture = ProcessStatesClientV1Fixture;
//# sourceMappingURL=ProcessStatesClientV1Fixture.js.map