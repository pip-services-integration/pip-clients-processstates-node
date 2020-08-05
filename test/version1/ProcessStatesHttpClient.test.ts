import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { ProcessStatesMemoryPersistence } from 'pip-services-processstates-node';
import { ProcessStatesController } from 'pip-services-processstates-node';
import { ProcessStatesHttpServiceV1 } from 'pip-services-processstates-node';

import { ProcessStatesHttpClientV1 } from '../../src/version1/ProcessStatesHttpClientV1';
import { ProcessStatesClientV1Fixture } from './ProcessStatesClientV1Fixture';

suite('ProcessStatesHttpClientV1', () => {
    let persistence: ProcessStatesMemoryPersistence;
    let controller: ProcessStatesController;
    let service: ProcessStatesHttpServiceV1;
    let client: ProcessStatesHttpClientV1;
    let fixture: ProcessStatesClientV1Fixture;

    setup((done) => {
        persistence = new ProcessStatesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new ProcessStatesController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new ProcessStatesHttpServiceV1();
        service.configure(httpConfig);

        client = new ProcessStatesHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('pip-services-processstates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-processstates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-processstates', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('pip-services-processstates', 'client', 'http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new ProcessStatesClientV1Fixture(client, persistence);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, (err) => {
                if (err) {
                    done(err);
                    return;
                }

                client.open(null, done);
            });
        });
    });

    teardown((done) => {
        client.close(null, (err) => {
            service.close(null, (err) => {
                persistence.close(null, done);
            });
        });
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get Process by null Id', (done) => {
        fixture.testGetProcessbynullId(done);
    });

    test('Continue Process', (done) => {
        fixture.testContinueProcess(done);
    });

    test('Try Continue Process with not exist id', (done) => {
        fixture.testTryContinueProcessWithnotExistId(done);
    });

    test('Try Continue Process with null id', (done) => {
        fixture.testTryContinueProcessWithNullId(done);
    });

    test('Abort Proces', (done) => {
        fixture.testAbortProces(done);
    });

    test('Continuie With Recovery Process', (done) => {
        fixture.testContinuieWithRecoveryProcess(done);
    });

    test('Complete Process', (done) => {
        fixture.testCompleteProcess(done);
    });

    test('Request For Response Process', (done) => {
        fixture.testRequestForResponseProcess(done);
    });

    test('Rollback Process With Status Running', (done) => {
        fixture.testRollbackProcessWithStatusRunning(done);
    });

    test('Rollback Process With State Starting', (done) => {
        fixture.testRollbackProcessWithStateStarting(done);
    });

    test('Fail Process', (done) => {
        fixture.testFailProcess(done);
    });

    test('Fail With Recovery Process', (done) => {
        fixture.testFailWithRecoveryProcess(done);
    });

    test('Continue For Fail Process', (done) => {
        fixture.testContinueForFailProcess(done);
    });

    test('Repeat Recovery Process', (done) => {
        fixture.testRepeatRecoveryProcess(done);
    });

    test('Return Error If Process State Dont Equal Starting', (done) => {
        fixture.testReturnErrorIfProcessStateDontEqualStarting(done);
    });

    test('Start', (done) => {
        fixture.testStart(done);
    });

    test('Start Or Activate Process', (done) => {
        fixture.testStartOrActivateProcess(done);
    });

    test('Return Error If Resume Started Without Process', (done) => {
        fixture.testReturnErrorIfResumeStartedWithoutProcess(done);
    });

    test('Return Error If Resume Started Without Process Id', (done) => {
        fixture.testReturnErrorIfResumeStartedWithoutProcessId(done);
    });

    test('Return Error If Process Type Null', (done) => {
        fixture.testReturnErrorIfProcessTypeNull(done);
    });

    test('Return Error If Process Key Null', (done) => {
        fixture.testReturnErrorIfProcessKeyNull(done);
    });

    test('Resume Without Completed Tasks Process', (done) => {
        fixture.testResumeWithoutCompletedTasksProcess(done);
    });

    test('Resume With Completed Tasks Process', (done) => {
        fixture.testResumeWithCompletedTasksProcess(done);
    });

    test('Clear Recovery Message In Process', (done) => {
        fixture.testClearRecoveryMessageInProcess(done);
    });

    test('Update Process', (done) => {
        fixture.testUpdateProcess(done);
    });

    test('Delete Process', (done) => {
        fixture.testDeleteProcess(done);
    });

});