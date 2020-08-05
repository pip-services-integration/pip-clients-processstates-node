"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services_processstates_node_1 = require("pip-services-processstates-node");
const pip_services_processstates_node_2 = require("pip-services-processstates-node");
const ProcessStatesDirectClientV1_1 = require("../../src/version1/ProcessStatesDirectClientV1");
const ProcessStatesClientV1Fixture_1 = require("./ProcessStatesClientV1Fixture");
suite('ProcessStatesDirectClientV1', () => {
    let persistence;
    let controller;
    let client;
    let fixture;
    setup((done) => {
        persistence = new pip_services_processstates_node_1.ProcessStatesMemoryPersistence();
        persistence.configure(new pip_services3_commons_node_1.ConfigParams());
        controller = new pip_services_processstates_node_2.ProcessStatesController();
        controller.configure(new pip_services3_commons_node_1.ConfigParams());
        client = new ProcessStatesDirectClientV1_1.ProcessStatesDirectClientV1();
        let references = pip_services3_commons_node_3.References.fromTuples(new pip_services3_commons_node_2.Descriptor('pip-services-processstates', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_node_2.Descriptor('pip-services-processstates', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_node_2.Descriptor('pip-services-processstates', 'client', 'direct', 'default', '1.0'), client);
        controller.setReferences(references);
        client.setReferences(references);
        fixture = new ProcessStatesClientV1Fixture_1.ProcessStatesClientV1Fixture(client, persistence);
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
//# sourceMappingURL=ProcessStatesDirectClientV1.test.js.map