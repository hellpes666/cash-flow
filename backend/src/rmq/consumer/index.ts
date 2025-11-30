import { RMQConsumerConnection } from './connection';
import { RMQConsumerHandler } from './handler';

export * from './handler';

export const RMQ_CONSUMER_SERVICES = [
	RMQConsumerConnection,
	RMQConsumerHandler,
];
