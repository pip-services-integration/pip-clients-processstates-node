"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class ProcessStatesNullClientV1 {
    getProcesses(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage());
    }
    getProcessById(correlationId, processId, callback) {
        callback(null, null);
    }
    startProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, callback) {
        callback(null, null);
    }
    activateOrStartProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, callback) {
        callback(null, null);
    }
    activateProcess(correlationId, processId, taskType, queueName, message, callback) {
        callback(null, null);
    }
    activateProcessByKey(correlationId, processType, processKey, taskType, queueName, message, callback) {
        callback(null, null);
    }
    rollbackProcess(correlationId, state, callback) {
        callback(null);
    }
    continueProcess(correlationId, state, callback) {
        callback(null);
    }
    continueAndRecoverProcess(correlationId, state, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        callback(null);
    }
    repeatProcessRecovery(correlationId, state, recoveryTimeout, callback) {
        callback(null);
    }
    clearProcessRecovery(correlationId, state, callback) {
        callback(null);
    }
    failAndContinueProcess(correlationId, state, errorMessage, callback) {
        callback(null);
    }
    failAndRecoverProcess(correlationId, state, errorMessage, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        callback(null);
    }
    suspendProcess(correlationId, state, request, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        callback(null);
    }
    failProcess(correlationId, state, errorMessage, callback) {
        callback(null);
    }
    resumeProcess(correlationId, state, comment, callback) {
        callback(null, null);
    }
    completeProcess(correlationId, state, callback) {
        callback(null);
    }
    abortProcess(correlationId, state, comment, callback) {
        callback(null);
    }
    updateProcess(correlationId, state, callback) {
        callback(null, null);
    }
    deleteProcessById(correlationId, processId, callback) {
        callback(null, null);
    }
    requestProcessForResponse(correlationId, state, request, recoveryQueueName, recoveryMessage, callback) {
        callback(null, null);
    }
}
exports.ProcessStatesNullClientV1 = ProcessStatesNullClientV1;
//# sourceMappingURL=ProcessStatesNullClientV1.js.map