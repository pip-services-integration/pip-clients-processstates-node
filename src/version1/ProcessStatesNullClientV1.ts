

import { IProcessStatesClient } from "./IProcessStatesClient";
import { FilterParams, PagingParams, DataPage } from "pip-services3-commons-node";
import { MessageV1 } from "./MessageV1";
import { ProcessStateV1 } from "./ProcessStateV1";

export class ProcessStatesNullClientV1 implements IProcessStatesClient {

    getProcesses(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ProcessStateV1>) => void): void {
        callback(null, new DataPage<ProcessStateV1>());
    }

    getProcessById(correlationId: string, processId: string, callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }

    startProcess(correlationId: string, processType: string, processKey: string, taskType: string, queueName: string, message: MessageV1,
        timeToLive: number, callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }

    activateOrStartProcess(correlationId: string, processType: string, processKey: string, taskType: string,
        queueName: string, message: MessageV1, timeToLive: number, callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }

    activateProcess(correlationId: string, processId: string, taskType: string, queueName: string,
        message: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }

    activateProcessByKey(correlationId: string, processType: string, processKey: string, taskType: string,
        queueName: string, message: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }

    rollbackProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        callback(null);
    }

    continueProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        callback(null);
    }

    continueAndRecoverProcess(correlationId: string, state: ProcessStateV1, recoveryQueue: string,
        recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        callback(null);
    }

    repeatProcessRecovery(correlationId: string, state: ProcessStateV1, recoveryTimeout: number,
        callback: (err: any) => void): void {
        callback(null);
    }

    clearProcessRecovery(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        callback(null);
    }

    failAndContinueProcess(correlationId: string, state: ProcessStateV1, errorMessage: string,
        callback: (err: any) => void): void {
        callback(null);
    }

    failAndRecoverProcess(correlationId: string, state: ProcessStateV1, errorMessage: string,
        recoveryQueue: string, recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        callback(null);
    }

    suspendProcess(correlationId: string, state: ProcessStateV1, request: string, recoveryQueue: string,
        recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        callback(null);
    }

    failProcess(correlationId: string, state: ProcessStateV1, errorMessage: string, callback: (err: any) => void): void {
        callback(null);
    }

    resumeProcess(correlationId: string, state: ProcessStateV1, comment: string,
        callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }

    completeProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        callback(null);
    }
    abortProcess(correlationId: string, state: ProcessStateV1, comment: string, callback: (err: any) => void): void {
        callback(null);
    }
    updateProcess(correlationId: string, state: ProcessStateV1, callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }
    deleteProcessById(correlationId: string, processId: string, callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }
    requestProcessForResponse(correlationId: string, state: ProcessStateV1, request: string,
        recoveryQueueName: string, recoveryMessage: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        callback(null, null);
    }
}