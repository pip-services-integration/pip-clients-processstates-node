import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ProcessStatesDirectClientV1 } from '../version1/ProcessStatesDirectClientV1';
import { ProcessStatesMemoryClientV1 } from '../version1/ProcessStatesMemoryClientV1';
import { ProcessStatesHttpClientV1 } from '../version1/ProcessStatesHttpClientV1';
import { ProcessStatesNullClientV1 } from '../version1/ProcessStatesNullClientV1';


export class ProcessStatesClientsFactory extends Factory {
	public static Descriptor = new Descriptor("pip-clients-processstates", "factory", "default", "default", "1.0");
	public static DirectClientDescriptor = new Descriptor("pip-clients-processstates", "client", "direct", "*", "1.0");
	public static MemoryClientDescriptor = new Descriptor("pip-clients-processstates", "client", "memory", "*", "1.0");
	public static HttpClientDescriptor = new Descriptor("pip-clients-processstates", "client", "http", "*", "1.0");
	public static NullClientDescriptor = new Descriptor("pip-clients-processstates", "client", "null", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ProcessStatesClientsFactory.DirectClientDescriptor, ProcessStatesDirectClientV1);
		this.registerAsType(ProcessStatesClientsFactory.MemoryClientDescriptor, ProcessStatesMemoryClientV1);
		this.registerAsType(ProcessStatesClientsFactory.HttpClientDescriptor, ProcessStatesHttpClientV1);
		this.registerAsType(ProcessStatesClientsFactory.NullClientDescriptor, ProcessStatesNullClientV1);
	}
	
}
