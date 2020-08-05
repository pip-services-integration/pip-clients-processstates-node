"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class ProcessStatesDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-processstates', 'controller', '*', '*', '1.0'));
    }
    getProcesses(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'processstates.get_processes');
        this._controller.getProcesses(correlationId, filter, paging, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }
    getProcessById(correlationId, processId, callback) {
        let timing = this.instrument(correlationId, 'processstates.get_process_by_id');
        this._controller.getProcessById(correlationId, processId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    startProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, callback) {
        let timing = this.instrument(correlationId, 'processstates.start_process');
        this._controller.startProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    activateOrStartProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, callback) {
        let timing = this.instrument(correlationId, 'processstates.activate_or_start_process');
        this._controller.activateOrStartProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    activateProcess(correlationId, processId, taskType, queueName, message, callback) {
        let timing = this.instrument(correlationId, 'processstates.activate_process');
        this._controller.activateProcess(correlationId, processId, taskType, queueName, message, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    activateProcessByKey(correlationId, processType, processKey, taskType, queueName, message, callback) {
        let timing = this.instrument(correlationId, 'processstates.activate_process_by_key');
        this._controller.activateProcessByKey(correlationId, processType, processKey, taskType, queueName, message, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    rollbackProcess(correlationId, state, callback) {
        let timing = this.instrument(correlationId, 'processstates.rollback_process');
        this._controller.rollbackProcess(correlationId, state, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    continueProcess(correlationId, state, callback) {
        let timing = this.instrument(correlationId, 'processstates.continue_process');
        this._controller.continueProcess(correlationId, state, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    continueAndRecoverProcess(correlationId, state, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        let timing = this.instrument(correlationId, 'processstates.continue_and_recover_process');
        this._controller.continueAndRecoverProcess(correlationId, state, recoveryQueue, recoveryMessage, recoveryTimeout, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    repeatProcessRecovery(correlationId, state, recoveryTimeout, callback) {
        let timing = this.instrument(correlationId, 'processstates.repeat_process_recovery');
        this._controller.repeatProcessRecovery(correlationId, state, recoveryTimeout, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    clearProcessRecovery(correlationId, state, callback) {
        let timing = this.instrument(correlationId, 'processstates.clear_process_recovery');
        this._controller.clearProcessRecovery(correlationId, state, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    failAndContinueProcess(correlationId, state, errorMessage, callback) {
        let timing = this.instrument(correlationId, 'processstates.fail_and_continue_process');
        this._controller.failAndContinueProcess(correlationId, state, errorMessage, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    failAndRecoverProcess(correlationId, state, errorMessage, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        let timing = this.instrument(correlationId, 'processstates.fail_and_recover_process');
        this._controller.failAndRecoverProcess(correlationId, state, errorMessage, recoveryQueue, recoveryMessage, recoveryTimeout, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    suspendProcess(correlationId, state, request, recoveryQueue, recoveryMessage, recoveryTimeout, callback) {
        let timing = this.instrument(correlationId, 'processstates.suspend_process');
        this._controller.suspendProcess(correlationId, state, request, recoveryQueue, recoveryMessage, recoveryTimeout, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    failProcess(correlationId, state, errorMessage, callback) {
        let timing = this.instrument(correlationId, 'processstates.fail_process');
        this._controller.failProcess(correlationId, state, errorMessage, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    resumeProcess(correlationId, state, comment, callback) {
        let timing = this.instrument(correlationId, 'processstates.resume_process');
        this._controller.resumeProcess(correlationId, state, comment, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    completeProcess(correlationId, state, callback) {
        let timing = this.instrument(correlationId, 'processstates.complete_process');
        this._controller.completeProcess(correlationId, state, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    abortProcess(correlationId, state, comment, callback) {
        let timing = this.instrument(correlationId, 'processstates.abort_process');
        this._controller.abortProcess(correlationId, state, comment, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    updateProcess(correlationId, state, callback) {
        let timing = this.instrument(correlationId, 'processstates.update_process');
        this._controller.updateProcess(correlationId, state, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    deleteProcessById(correlationId, processId, callback) {
        let timing = this.instrument(correlationId, 'processstates.delete_process_by_id');
        this._controller.deleteProcessById(correlationId, processId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    requestProcessForResponse(correlationId, state, request, recoveryQueueName, recoveryMessage, callback) {
        let timing = this.instrument(correlationId, 'processstates.request_process_for_response');
        this._controller.requestProcessForResponse(correlationId, state, request, recoveryQueueName, recoveryMessage, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
}
exports.ProcessStatesDirectClientV1 = ProcessStatesDirectClientV1;
//# sourceMappingURL=ProcessStatesDirectClientV1.js.map