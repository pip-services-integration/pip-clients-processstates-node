let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { IProcessStatesClient } from '../../src/version1/IProcessStatesClient';
import { IProcessStatesPersistence, MessageV1, ProcessStatusV1, ProcessStateV1, TaskStateV1, TaskStatusV1 } from 'pip-services-processstates-node';


let MESSAGE1: MessageV1 = {
    correlation_id: "test_processes1",
    message_id: "msg_1",
    message_type: "Order.Msg",
    sent_time: new Date(Date.now() - 2 * 3600),
    message: "Sync orders"
}

let MESSAGE2: MessageV1 = {
    correlation_id: "test_processes2",
    message_id: "msg_2",
    message_type: "Order.Msg",
    sent_time: new Date(Date.now() - 3600),
    message: "Copy orders"
}

let MESSAGE3: MessageV1 = {
    correlation_id: "test_processes3",
    message_id: "msg_3",
    message_type: "Order.Msg",
    sent_time: new Date(),
    message: "Sync orders"
}


export class ProcessStatesClientV1Fixture {
    private _client: IProcessStatesClient;
    private _persistence: IProcessStatesPersistence

    constructor(client: IProcessStatesClient, persistence: IProcessStatesPersistence) {
        assert.isNotNull(client);
        assert.isNotNull(persistence);
        this._client = client;
        this._persistence = persistence;
    }

    public testCrudOperations(done) {

        let process1, process2: ProcessStateV1;

        async.series([
            // Create process one
            (callback) => {
                this._client.startProcess(null, "Process.Type1", null, "Task.TypeX", "queue_x", MESSAGE1, 5 * 3600, (err, process) => {
                    assert.isNull(err);
                    assert.equal(process.request_id, MESSAGE1.correlation_id);
                    assert.equal(process.type, "Process.Type1");
                    assert.equal(process.status, ProcessStatusV1.Starting);
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
                    assert.equal(process.status, ProcessStatusV1.Starting);
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
                    assert.equal(process.status, ProcessStatusV1.Starting);
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
                this._client.getProcesses(null, new FilterParams(), new PagingParams, (err, page) => {
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
                this._client.getProcesses(null, new FilterParams(), new PagingParams, (err, page) => {
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

    public testGetProcessbynullId(done) {
        this._client.getProcessById(null, null, (err, process) => {
            assert.isNotNull(err);
            done();
        });
    }

    public testContinueProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        this._persistence.create(null, process, (err, item) => {
            assert.isNull(err);
            this._client.continueProcess(null, process, (err) => {
                assert.isNull(err);
                done();
            });
        });
    }

    public testTryContinueProcessWithnotExistId(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id_not_exists";
        this._client.continueProcess(null, process, (err) => {
            assert.isNotNull(err);
            done();
        });
    }

    public testTryContinueProcessWithNullId(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        this._client.continueProcess(null, process, (err) => {
            assert.isNotNull(err);
            done();
        });
    }

    public testAbortProces(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        let comment = "comment";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                    assert.equal(ProcessStatusV1.Aborted, processResult.status);
                    assert.equal(comment, processResult.comment);
                    callback();
                });
            }

        ], (err) => {
            done(err);

        });
    }


    public testContinuieWithRecoveryProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        let messageEnvelop: MessageV1 = new MessageV1();
        messageEnvelop.correlation_id = "corrlation id";
        messageEnvelop.message_type = "message type"
        messageEnvelop.message = "";
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                    assert.equal(ProcessStatusV1.Running, processResult.status);
                    assert.equal(process.id, processResult.id);
                    assert.equal(messageEnvelop.correlation_id, processResult.recovery_message.correlation_id);
                    assert.equal(messageEnvelop.message_type, processResult.recovery_message.message_type);
                    assert.equal("queue name", processResult.recovery_queue_name);
                    callback();
                })
            }
        ], (err) => {
            done(err);
        });

    }

    public testCompleteProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                    assert.equal(ProcessStatusV1.Completed, processResult.status);
                    callback();
                })
            }
        ], (err) => {
            done(err);
        });
    }

    public testRequestForResponseProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
            },
            (callback) => {
                this._client.requestProcessForResponse(null, process, "request", "queue", new MessageV1(), (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(process.id, processResult.id);
                    assert.equal("queue", processResult.recovery_queue_name);
                    assert.equal("request", processResult.request);
                    assert.equal(ProcessStatusV1.Suspended, processResult.status);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });

    }

    public testRollbackProcessWithStatusRunning(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                    assert.equal(ProcessStatusV1.Running, processResult.status);
                    callback();
                });
            }
        ], (err) => {
            done(err);
        });
    }

    public testRollbackProcessWithStateStarting(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Starting;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                })
            }
        ], (err) => {
            done(err);
        });
    }


    public testFailProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        let comment = "comment";

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                    assert.equal(ProcessStatusV1.Failed, processResult.status);
                    callback();
                })
            }], (err) => {
                done(err);
            });

    }

    public testFailWithRecoveryProcess(done) {

        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        let error = "error Message";
        let messageEnvelop: MessageV1 = new MessageV1();
        messageEnvelop.correlation_id = "corrlation id";
        messageEnvelop.message_type = "message type"
        messageEnvelop.message = "";

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                    assert.equal(messageEnvelop.correlation_id, processResult.recovery_message.correlation_id);
                    assert.equal(messageEnvelop.message_type, processResult.recovery_message.message_type);
                    assert.equal("queue name", processResult.recovery_queue_name);
                    callback();
                })
            }], (err) => {
                done(err);
            });
    }


    public testContinueForFailProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        let error = "error Message";
        let messageEnvelop: MessageV1 = new MessageV1();
        messageEnvelop.correlation_id = "corrlation id";
        messageEnvelop.message_type = "message type"
        messageEnvelop.message = "";

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                    assert.equal(ProcessStatusV1.Running, processResult.status);
                    assert.isNull(processResult.recovery_message);
                    assert.isNull(processResult.recovery_queue_name);
                    callback();
                })
            }], (err) => {
                done(err);
            });
    }


    public testRepeatRecoveryProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                })
            }], (err) => {
                done(err);
            });

    }


    public testReturnErrorIfProcessStateDontEqualStarting(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        process.key = "key";
        process.type = "type";

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
            },
            (callback) => {
                this._client.startProcess(null, "type", "key", "type", null, null, null, (err, process) => {
                    assert.isNotNull(err);
                    callback();
                });
            }], (err) => {
                done(err);
            });
    }


    public testStart(done) {
        this._client.startProcess(null, "type", "key", "type", null, null, 0, (err, processResult) => {
            assert.isNull(err);
            assert.equal(ProcessStatusV1.Starting, processResult.status);
            done(err);
        });
    }

    public testStartOrActivateProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Starting;

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
            },
            (callback) => {
                this._client.activateOrStartProcess(null, "type", "key", "type", null, null, 0, (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(ProcessStatusV1.Starting, processResult.status);
                    callback();
                });
            }], (err) => {
                done(err);
            });
    }


    public testReturnErrorIfResumeStartedWithoutProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Starting;
        this._client.resumeProcess(null, process, "comment", (err, process) => {
            assert.isNotNull(err);
            done();
        });
    }

    public testReturnErrorIfResumeStartedWithoutProcessId(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.lock_token = "token";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Starting;

        this._client.resumeProcess(null, process, "comment", (err, process) => {
            assert.isNotNull(err);
            done();
        });
    }


    public testReturnErrorIfProcessTypeNull(done) {
        this._client.activateOrStartProcess(null, null, "key", "type", null, null, 0, (err, process) => {
            assert.isNotNull(err);
            done();
        });
    }

    //TODO: Need check this test!
    public testReturnErrorIfProcessKeyNull(done) {
        this._client.activateOrStartProcess(null, "type", null, "type", null, new MessageV1(), 0, (err, item) => {
            assert.isNotNull(err);
            done();
        });
    }


    public testResumeWithoutCompletedTasksProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Suspended;
        process.tasks = new Array<TaskStateV1>();

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
            },
            (callback) => {
                this._client.resumeProcess(null, process, "comment", (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(ProcessStatusV1.Starting, processResult.status);
                    assert.equal("comment", processResult.comment);
                    callback();
                });
            }], (err) => {
                done(err);
            });
    }


    public testResumeWithCompletedTasksProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Suspended;
        process.tasks = new Array<TaskStateV1>();
        let task: TaskStateV1 = new TaskStateV1();
        task.type = "task.type";
        task.status = TaskStatusV1.Completed;
        task.queue_name = "activity queue name";
        process.tasks.push(task);

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    callback();
                })
            },
            (callback) => {
                this._client.resumeProcess(null, process, "comment", (err, processResult) => {
                    assert.isNull(err);
                    assert.equal(ProcessStatusV1.Running, processResult.status);
                    assert.equal("comment", processResult.comment);
                    callback();
                });
            }], (err) => {
                done(err);
            });
    }


    public testClearRecoveryMessageInProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        process.recovery_message = new MessageV1();
        process.recovery_time = new Date();
        process.recovery_queue_name = "queue";

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    process = item;
                    callback();
                })
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
                })
            }], (err) => {
                done(err);
            });
    }

    public testUpdateProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.type = "type";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        process.recovery_message = new MessageV1();
        process.recovery_time = new Date();
        process.recovery_queue_name = "queue";

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    callback();
                })
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
            }], (err) => {
                done(err);
            });
    }

    public testDeleteProcess(done) {
        let process: ProcessStateV1 = new ProcessStateV1();
        process.id = "id";
        process.lock_token = "token";
        process.locked_until_time = new Date();
        process.status = ProcessStatusV1.Running;
        process.recovery_message = new MessageV1();
        process.recovery_time = new Date();
        process.recovery_queue_name = "queue";

        async.series([
            (callback) => {
                this._persistence.create(null, process, (err, item) => {
                    assert.isNull(err);
                    callback();
                })
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
                })
            }], (err) => {
                done(err);
            });
    }

}
