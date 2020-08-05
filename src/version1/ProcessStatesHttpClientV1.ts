import { CommandableHttpClient } from "pip-services3-rpc-node";
import { IProcessStatesClient } from "./IProcessStatesClient";
import { FilterParams, PagingParams, DataPage } from "pip-services3-commons-node";
import { MessageV1 } from "./MessageV1";
import { ProcessStateV1 } from "./ProcessStateV1";

export class ProcessStatesHttpClientV1 extends CommandableHttpClient implements IProcessStatesClient {

    public constructor() {
        super('v1/process_states');
    }

    getProcesses(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ProcessStateV1>) => void): void {
        this.callCommand(
            'get_processes',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }


    getProcessById(correlationId: string, processId: string, callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'get_process_by_id',
            correlationId,
            {
                process_id: processId
            },
            callback
        );
    }

    startProcess(correlationId: string, processType: string, processKey: string, taskType: string, queueName: string,
        message: MessageV1, timeToLive: number, callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'start_process',
            correlationId,
            {
                process_type: processType,
                process_key: processKey,
                task_type: taskType,
                queue_name: queueName,
                message: message,
                ttl: timeToLive
            },
            callback
        );
    }

    activateOrStartProcess(correlationId: string, processType: string, processKey: string, taskType: string,
        queueName: string, message: MessageV1, timeToLive: number, callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'activate_or_start_process',
            correlationId,
            {
                process_type: processType,
                process_key: processKey,
                task_type: taskType,
                queue_name: queueName,
                message: message,
                ttl: timeToLive
            },
            callback
        );
    }

    activateProcess(correlationId: string, processId: string, taskType: string, queueName: string, message: MessageV1,
        callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'activate_process',
            correlationId,
            {
                process_id: processId,
                task_type: taskType,
                queue_name: queueName,
                message: message
            },
            callback
        );
    }

    activateProcessByKey(correlationId: string, processType: string, processKey: string, taskType: string,
        queueName: string, message: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'activate_process_by_key',
            correlationId,
            {
                process_type: processType,
                process_key: processKey,
                task_type: taskType,
                queue_name: queueName,
                message: message
            },
            callback
        );
    }

    rollbackProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        this.callCommand(
            'rollback_process',
            correlationId,
            {
                state: state
            }, (err, result) => {
                callback(err);
            }
        );
    }

    continueProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        this.callCommand(
            'continue_process',
            correlationId,
            {
                state: state
            }, (err, result) => {
                callback(err);
            }
        );
    }

    continueAndRecoverProcess(correlationId: string, state: ProcessStateV1, recoveryQueue: string,
        recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        this.callCommand(
            'continue_and_recovery_process',
            correlationId,
            {
                state: state,
                queue_name: recoveryQueue,
                message: recoveryMessage,
                timeout: recoveryTimeout
            }, (err, result) => {
                callback(err);
            }
        );
    }

    repeatProcessRecovery(correlationId: string, state: ProcessStateV1, recoveryTimeout: number,
        callback: (err: any) => void): void {
        this.callCommand(
            'repeat_process_recovery',
            correlationId,
            {
                state: state,
                timeout: recoveryTimeout
            }, (err, result) => {
                callback(err);
            }
        );
    }

    clearProcessRecovery(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        this.callCommand(
            'clear_process_recovery',
            correlationId,
            {
                state: state
            }, (err, result) => {
                callback(err);
            }
        );
    }

    failAndContinueProcess(correlationId: string, state: ProcessStateV1, errorMessage: string,
        callback: (err: any) => void): void {
        this.callCommand(
            'fail_and_continue_process',
            correlationId,
            {
                state: state,
                err_msg: errorMessage
            }, (err, result) => {
                callback(err);
            }
        );
    }

    failAndRecoverProcess(correlationId: string, state: ProcessStateV1, errorMessage: string,
        recoveryQueue: string, recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        this.callCommand(
            'fail_and_recover_process',
            correlationId,
            {
                state: state,
                err_msg: errorMessage,
                queue_name: recoveryQueue,
                message: recoveryMessage,
                timeout: recoveryTimeout
            }, (err, result) => {
                callback(err);
            }
        );
    }

    suspendProcess(correlationId: string, state: ProcessStateV1, request: string, recoveryQueue: string,
        recoveryMessage: MessageV1, recoveryTimeout: number, callback: (err: any) => void): void {
        this.callCommand(
            'suspend_process',
            correlationId,
            {
                state: state,
                request: request,
                queue_name: recoveryQueue,
                message: recoveryMessage,
                timeout: recoveryTimeout
            }, (err, result) => {
                callback(err);
            }
        );
    }

    failProcess(correlationId: string, state: ProcessStateV1, errorMessage: string,
        callback: (err: any) => void): void {
        this.callCommand(
            'fail_process',
            correlationId,
            {
                state: state,
                err_msg: errorMessage
            }, (err, result) => {
                callback(err);
            }
        );
    }

    resumeProcess(correlationId: string, state: ProcessStateV1, comment: string,
        callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'resume_process',
            correlationId,
            {
                state: state,
                comment: comment
            }, callback
        );
    }

    completeProcess(correlationId: string, state: ProcessStateV1, callback: (err: any) => void): void {
        this.callCommand(
            'complete_process',
            correlationId,
            {
                state: state
            }, (err, result) => {
                callback(err);
            }
        );
    }

    abortProcess(correlationId: string, state: ProcessStateV1, comment: string, callback: (err: any) => void): void {
        this.callCommand(
            'abort_process',
            correlationId,
            {
                state: state,
                comment: comment
            }, (err, result) => {
                callback(err);
            }
        );
    }

    updateProcess(correlationId: string, state: ProcessStateV1, callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'update_process',
            correlationId,
            {
                state: state
            }, callback
        );
    }

    deleteProcessById(correlationId: string, processId: string, callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'delete_process_by_id',
            correlationId,
            {
                process_id: processId
            }, callback
        );
    }

    requestProcessForResponse(correlationId: string, state: ProcessStateV1, request: string,
        recoveryQueueName: string, recoveryMessage: MessageV1, callback: (err: any, state: ProcessStateV1) => void): void {
        this.callCommand(
            'request_process_for_response',
            correlationId,
            {
                state: state,
                request: request,
                queue_name: recoveryQueueName,
                message: recoveryMessage
            }, callback
        );
    }
}