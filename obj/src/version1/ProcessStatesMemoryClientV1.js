"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessStatesMemoryClientV1 {
    getProcesses(correlationId, filter, paging, callback) {
        throw new Error("Method not implemented.");
    }
    getProcessById(correlationId, processId, callback) {
        throw new Error("Method not implemented.");
    }
    startProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, callback) {
        throw new Error("Method not implemented.");
    }
    activateOrStartProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, callback) {
        throw new Error("Method not implemented.");
    }
    activateProcess(correlationId, processId, taskType, queueName, message, callback) {
        throw new Error("Method not implemented.");
    }
    activateProcessByKey(correlationId, processType, processKey, taskType, queueName, message, callback) {
        throw new Error("Method not implemented.");
    }
    rollbackProcess(correlationId, state, callback) {
        throw new Error("Method not implemented.");
    }
    continueProcess(correlationId, state, callback) {
        throw new Error("Method not implemented.");
    }
    continueAndRecoverProcess(correlationId, state, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        throw new Error("Method not implemented.");
    }
    repeatProcessRecovery(correlationId, state, recoveryTimeout, callback) {
        throw new Error("Method not implemented.");
    }
    clearProcessRecovery(correlationId, state, callback) {
        throw new Error("Method not implemented.");
    }
    failAndContinueProcess(correlationId, state, errorMessage, callback) {
        throw new Error("Method not implemented.");
    }
    failAndRecoverProcess(correlationId, state, errorMessage, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        throw new Error("Method not implemented.");
    }
    suspendProcess(correlationId, state, request, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        throw new Error("Method not implemented.");
    }
    failProcess(correlationId, state, errorMessage, callback) {
        throw new Error("Method not implemented.");
    }
    resumeProcess(correlationId, state, comment, callback) {
        throw new Error("Method not implemented.");
    }
    completeProcess(correlationId, state, callback) {
        throw new Error("Method not implemented.");
    }
    abortProcess(correlationId, state, comment, callback) {
        throw new Error("Method not implemented.");
    }
    updateProcess(correlationId, state, callback) {
        throw new Error("Method not implemented.");
    }
    deleteProcessById(correlationId, processId, callback) {
        throw new Error("Method not implemented.");
    }
    requestProcessForResponse(correlationId, state, request, recoveryQueueName, recoveryMessage, callback) {
        throw new Error("Method not implemented.");
    }
}
exports.ProcessStatesMemoryClientV1 = ProcessStatesMemoryClientV1;
//# sourceMappingURL=ProcessStatesMemoryClientV1.js.map