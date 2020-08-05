

import { IProcessStatesClient } from "./IProcessStatesClient";
import { FilterParams, PagingParams, DataPage, Descriptor } from "pip-services3-commons-node";
import { MessageV1 } from "./MessageV1";
import { ProcessStateV1 } from "./ProcessStateV1";
import { DirectClient } from "pip-services3-rpc-node";

export class ProcessStatesDirectClientV1 extends DirectClient<any> implements IProcessStatesClient {

    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('pip-services-processstates', 'controller', '*', '*', '1.0'));
    }

    getProcesses(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ProcessStateV1>) => void): void {
        let timing = this.instrument(correlationId, 'processstates.get_processes');
        this._controller.getProcesses(correlationId, filter, paging, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }

    getProcessById(correlationId: string, processId: string, callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.get_process_by_id');
        this._controller.getProcessById(correlationId, processId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    startProcess(correlationId: string, processType: string, processKey: string, taskType: string, queueName: string,
        message: MessageV1, timeToLive: number, callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.start_process');
        this._controller.startProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    activateOrStartProcess(correlationId: string, processType: string, processKey: string, taskType: string, queueName: string,
        message: MessageV1, timeToLive: number, callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.activate_or_start_process');
        this._controller.activateOrStartProcess(correlationId, processType, processKey, taskType, queueName, message, timeToLive, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    activateProcess(correlationId: string, processId: string, taskType: string, queueName: string, message: MessageV1,
        callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.activate_process');
        this._controller.activateProcess(correlationId, processId, taskType, queueName, message, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    activateProcessByKey(correlationId: string, processType: string, processKey: string, taskType: string, queueName: string,
        message: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.activate_process_by_key');
        this._controller.activateProcessByKey(correlationId, processType, processKey, taskType, queueName, message, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    rollbackProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.rollback_process');
        this._controller.rollbackProcess(correlationId, state, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    continueProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.continue_process');
        this._controller.continueProcess(correlationId, state, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    continueAndRecoverProcess(correlationId: string, state: ProcessStateV1, recoveryQueue: string, recoveryMessage: MessageV1,
        recoveryTimeout: number, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.continue_and_recover_process');
        this._controller.continueAndRecoverProcess(correlationId, state, recoveryQueue, recoveryMessage, recoveryTimeout, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    repeatProcessRecovery(correlationId: string, state: ProcessStateV1, recoveryTimeout: number, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.repeat_process_recovery');
        this._controller.repeatProcessRecovery(correlationId, state, recoveryTimeout, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    clearProcessRecovery(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.clear_process_recovery');
        this._controller.clearProcessRecovery(correlationId, state, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    failAndContinueProcess(correlationId: string, state: ProcessStateV1, errorMessage: string, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.fail_and_continue_process');
        this._controller.failAndContinueProcess(correlationId, state, errorMessage, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    failAndRecoverProcess(correlationId: string, state: ProcessStateV1, errorMessage: string, recoveryQueue: string, recoveryMessage: MessageV1,
        recoveryTimeout: number, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.fail_and_recover_process');
        this._controller.failAndRecoverProcess(correlationId, state, errorMessage, recoveryQueue, recoveryMessage, recoveryTimeout, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    suspendProcess(correlationId: string, state: ProcessStateV1, request: string, recoveryQueue: string, recoveryMessage: MessageV1,
        recoveryTimeout: number, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.suspend_process');
        this._controller.suspendProcess(correlationId, state, request, recoveryQueue, recoveryMessage, recoveryTimeout, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    failProcess(correlationId: string, state: ProcessStateV1, errorMessage: string, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.fail_process');
        this._controller.failProcess(correlationId, state, errorMessage, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    resumeProcess(correlationId: string, state: ProcessStateV1, comment: string, callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.resume_process');
        this._controller.resumeProcess(correlationId, state, comment, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    completeProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.complete_process');
        this._controller.completeProcess(correlationId, state, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    abortProcess(correlationId: string, state: ProcessStateV1, comment: string, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'processstates.abort_process');
        this._controller.abortProcess(correlationId, state, comment, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    updateProcess(correlationId: string, state: ProcessStateV1, callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.update_process');
        this._controller.updateProcess(correlationId, state, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    deleteProcessById(correlationId: string, processId: string, callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.delete_process_by_id');
        this._controller.deleteProcessById(correlationId, processId, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    requestProcessForResponse(correlationId: string, state: ProcessStateV1, request: string, recoveryQueueName: string,
        recoveryMessage: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        let timing = this.instrument(correlationId, 'processstates.request_process_for_response');
        this._controller.requestProcessForResponse(correlationId, state, request, recoveryQueueName, recoveryMessage, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
}