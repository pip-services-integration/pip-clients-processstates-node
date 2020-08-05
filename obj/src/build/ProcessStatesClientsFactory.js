"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const ProcessStatesDirectClientV1_1 = require("../version1/ProcessStatesDirectClientV1");
const ProcessStatesMemoryClientV1_1 = require("../version1/ProcessStatesMemoryClientV1");
const ProcessStatesHttpClientV1_1 = require("../version1/ProcessStatesHttpClientV1");
const ProcessStatesNullClientV1_1 = require("../version1/ProcessStatesNullClientV1");
class ProcessStatesClientsFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ProcessStatesClientsFactory.DirectClientDescriptor, ProcessStatesDirectClientV1_1.ProcessStatesDirectClientV1);
        this.registerAsType(ProcessStatesClientsFactory.MemoryClientDescriptor, ProcessStatesMemoryClientV1_1.ProcessStatesMemoryClientV1);
        this.registerAsType(ProcessStatesClientsFactory.HttpClientDescriptor, ProcessStatesHttpClientV1_1.ProcessStatesHttpClientV1);
        this.registerAsType(ProcessStatesClientsFactory.NullClientDescriptor, ProcessStatesNullClientV1_1.ProcessStatesNullClientV1);
    }
}
exports.ProcessStatesClientsFactory = ProcessStatesClientsFactory;
ProcessStatesClientsFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-processstates", "factory", "default", "default", "1.0");
ProcessStatesClientsFactory.DirectClientDescriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-processstates", "client", "direct", "*", "1.0");
ProcessStatesClientsFactory.MemoryClientDescriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-processstates", "client", "memory", "*", "1.0");
ProcessStatesClientsFactory.HttpClientDescriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-processstates", "client", "http", "*", "1.0");
ProcessStatesClientsFactory.NullClientDescriptor = new pip_services3_commons_node_1.Descriptor("pip-clients-processstates", "client", "null", "*", "1.0");
//# sourceMappingURL=ProcessStatesClientsFactory.js.map