
import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { ProcessStatesMemoryPersistence } from 'pip-services-processstates-node';
import { ProcessStatesController } from 'pip-services-processstates-node';

import { ProcessStatesDirectClientV1 } from '../../src/version1/ProcessStatesDirectClientV1';
import { ProcessStatesClientV1Fixture } from './ProcessStatesClientV1Fixture';


suite('ProcessStatesDirectClientV1', () => {
    let persistence: ProcessStatesMemoryPersistence;
    let controller: ProcessStatesController;
    let client: ProcessStatesDirectClientV1;
    let fixture: ProcessStatesClientV1Fixture;

    setup((done) => {
        persistence = new ProcessStatesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new ProcessStatesController();
        controller.configure(new ConfigParams());

        client = new ProcessStatesDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('pip-services-processstates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-processstates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-processstates', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new ProcessStatesClientV1Fixture(client, persistence);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
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