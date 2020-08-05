
import { IProcessStatesClient } from "./IProcessStatesClient";
import { FilterParams, PagingParams } from "pip-services3-commons-node";
import { MessageV1 } from "./MessageV1";
import { ProcessStateV1 } from "./ProcessStateV1";

export class ProcessStatesMemoryClientV1 implements IProcessStatesClient {
    
    getProcesses(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: import("pip-services3-commons-node").DataPage<ProcessStateV1>) => void): void {
        throw new Error("Method not implemented.");
    }
    getProcessById(correlationId: string, processId: string, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }
    startProcess(correlationId: string, processType: string, processKey: string, taskType: string, queueName: string, message: MessageV1, timeToLive: number, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }
    activateOrStartProcess(correlationId: string, processType: string, processKey: string, taskType: string, queueName: string, message: MessageV1, timeToLive: number, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }
    activateProcess(correlationId: string, processId: string, taskType: string, queueName: string, message: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }
    activateProcessByKey(correlationId: string, processType: string, processKey: string, taskType: string, queueName: string, message: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }
    rollbackProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    continueProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    continueAndRecoverProcess(correlationId: string, state: ProcessStateV1, recoveryQueue: string, recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    repeatProcessRecovery(correlationId: string, state: ProcessStateV1, recoveryTimeout: number, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    clearProcessRecovery(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    failAndContinueProcess(correlationId: string, state: ProcessStateV1, errorMessage: string, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    failAndRecoverProcess(correlationId: string, state: ProcessStateV1, errorMessage: string, recoveryQueue: string, recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    suspendProcess(correlationId: string, state: ProcessStateV1, request: string, recoveryQueue: string, recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    failProcess(correlationId: string, state: ProcessStateV1, errorMessage: string, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    resumeProcess(correlationId: string, state: ProcessStateV1, comment: string, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }
    completeProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    abortProcess(correlationId: string, state: ProcessStateV1, comment: string, callback: (err: any) => void): void {
        throw new Error("Method not implemented.");
    }
    updateProcess(correlationId: string, state: ProcessStateV1, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }
    deleteProcessById(correlationId: string, processId: string, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }
    requestProcessForResponse(correlationId: string, state: ProcessStateV1, request: string, recoveryQueueName: string, recoveryMessage: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        throw new Error("Method not implemented.");
    }

}