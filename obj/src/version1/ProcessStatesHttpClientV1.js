"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class ProcessStatesHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor() {
        super('v1/process_states');
    }
    getProcesses(correlationId, filter, paging, callback) {
        this.callCommand('get_processes', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getProcessById(correlationId, processId, callback) {
        this.callCommand('get_process_by_id', correlationId, {
            process_id: processId
        }, callback);
    }
    startProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, callback) {
        this.callCommand('start_process', correlationId, {
            process_type: processType,
            process_key: processKey,
            task_type: taskType,
            queue_name: queueName,
            message: message,
            ttl: timeToLive
        }, callback);
    }
    activateOrStartProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, callback) {
        this.callCommand('activate_or_start_process', correlationId, {
            process_type: processType,
            process_key: processKey,
            task_type: taskType,
            queue_name: queueName,
            message: message,
            ttl: timeToLive
        }, callback);
    }
    activateProcess(correlationId, processId, taskType, queueName, message, callback) {
        this.callCommand('activate_process', correlationId, {
            process_id: processId,
            task_type: taskType,
            queue_name: queueName,
            message: message
        }, callback);
    }
    activateProcessByKey(correlationId, processType, processKey, taskType, queueName, message, callback) {
        this.callCommand('activate_process_by_key', correlationId, {
            process_type: processType,
            process_key: processKey,
            task_type: taskType,
            queue_name: queueName,
            message: message
        }, callback);
    }
    rollbackProcess(correlationId, state, callback) {
        this.callCommand('rollback_process', correlationId, {
            state: state
        }, (err, result) => {
            callback(err);
        });
    }
    continueProcess(correlationId, state, callback) {
        this.callCommand('continue_process', correlationId, {
            state: state
        }, (err, result) => {
            callback(err);
        });
    }
    continueAndRecoverProcess(correlationId, state, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        this.callCommand('continue_and_recovery_process', correlationId, {
            state: state,
            queue_name: recoveryQueue,
            message: recoveryMessage,
            timeout: recoveryTimeout
        }, (err, result) => {
            callback(err);
        });
    }
    repeatProcessRecovery(correlationId, state, recoveryTimeout, callback) {
        this.callCommand('repeat_process_recovery', correlationId, {
            state: state,
            timeout: recoveryTimeout
        }, (err, result) => {
            callback(err);
        });
    }
    clearProcessRecovery(correlationId, state, callback) {
        this.callCommand('clear_process_recovery', correlationId, {
            state: state
        }, (err, result) => {
            callback(err);
        });
    }
    failAndContinueProcess(correlationId, state, errorMessage, callback) {
        this.callCommand('fail_and_continue_process', correlationId, {
            state: state,
            err_msg: errorMessage
        }, (err, result) => {
            callback(err);
        });
    }
    failAndRecoverProcess(correlationId, state, errorMessage, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        this.callCommand('fail_and_recover_process', correlationId, {
            state: state,
            err_msg: errorMessage,
            queue_name: recoveryQueue,
            message: recoveryMessage,
            timeout: recoveryTimeout
        }, (err, result) => {
            callback(err);
        });
    }
    suspendProcess(correlationId, state, request, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        this.callCommand('suspend_process', correlationId, {
            state: state,
            request: request,
            queue_name: recoveryQueue,
            message: recoveryMessage,
            timeout: recoveryTimeout
        }, (err, result) => {
            callback(err);
        });
    }
    failProcess(correlationId, state, errorMessage, callback) {
        this.callCommand('fail_process', correlationId, {
            state: state,
            err_msg: errorMessage
        }, (err, result) => {
            callback(err);
        });
    }
    resumeProcess(correlationId, state, comment, callback) {
        this.callCommand('resume_process', correlationId, {
            state: state,
            comment: comment
        }, callback);
    }
    completeProcess(correlationId, state, callback) {
        this.callCommand('complete_process', correlationId, {
            state: state
        }, (err, result) => {
            callback(err);
        });
    }
    abortProcess(correlationId, state, comment, callback) {
        this.callCommand('abort_process', correlationId, {
            state: state,
            comment: comment
        }, (err, result) => {
            callback(err);
        });
    }
    updateProcess(correlationId, state, callback) {
        this.callCommand('update_process', correlationId, {
            state: state
        }, callback);
    }
    deleteProcessById(correlationId, processId, callback) {
        this.callCommand('delete_process_by_id', correlationId, {
            process_id: processId
        }, callback);
    }
    requestProcessForResponse(correlationId, state, request, recoveryQueueName, recoveryMessage, callback) {
        this.callCommand('request_process_for_response', correlationId, {
            state: state,
            request: request,
            queue_name: recoveryQueueName,
            message: recoveryMessage
        }, callback);
    }
}
exports.ProcessStatesHttpClientV1 = ProcessStatesHttpClientV1;
//# sourceMappingURL=ProcessStatesHttpClientV1.js.map