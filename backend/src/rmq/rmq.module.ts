import { Module } from '@nestjs/common';

import { RMQConsumerHandler, RMQ_CONSUMER_SERVICES } from './consumer';
import { RMQProducerSender, RMQ_PRODUCER_SERVICES } from './producer';

@Module({
	providers: [...RMQ_PRODUCER_SERVICES, ...RMQ_CONSUMER_SERVICES],
	exports: [RMQProducerSender, RMQConsumerHandler],
})
export class RmqModule {}
