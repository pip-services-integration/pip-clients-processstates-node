// import { ConfigParams } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';
// import { ProcessStatesMemoryPersistence } from 'pip-services-processstates-node';
// import { ProcessStatesController } from 'pip-services-processstates-node';
// import { ProcessStatesMemoryClientV1 } from '../../src/version1/ProcessStatesMemoryClientV1';
// import { ProcessStatesClientV1Fixture } from './ProcessStatesClientV1Fixture';
// suite('ProcessStatesDirectClientV1', () => {
//     let client: ProcessStatesMemoryClientV1;
//     let fixture: ProcessStatesClientV1Fixture;
//     setup((done) => {
//         client = new ProcessStatesMemoryClientV1();
//         let references = References.fromTuples(
//             new Descriptor('pip-services-processstates', 'client', 'memory', 'default', '1.0'), client
//         );
//         //client.setReferences(references);
//         fixture = new ProcessStatesClientV1Fixture(client);
//         done();
//     });
//     teardown((done) => {
//         done();
//     });
//     test('Get Mapping Collections', (done) => {
//         fixture.testGetMappingCollections(done);
//     });
//     test('Get ProcessStates', (done) => {
//         fixture.testGetProcessStates(done);
//     });
//     test('Mapping', (done) => {
//         fixture.testMapping(done);
//     });
// });
//# sourceMappingURL=ProcessStatesMemoryClientV1.test.js.map