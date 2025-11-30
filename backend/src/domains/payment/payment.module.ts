import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RMQ_ORDERS_QUEUE, RMQ_ORDERS_SERVICE } from 'src/lib';
import { RmqModule } from 'src/rmq/rmq.module';

import { UserModule } from '../user';

import { PaymentController } from './payment.controller';
import { PAYMENTS_SERVICES } from './services';

@Module({
	imports: [
		HttpModule,
		UserModule,
		RmqModule,
		ClientsModule.register([
			{
				name: RMQ_ORDERS_SERVICE,
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}:5672`,
					],
					queue: RMQ_ORDERS_QUEUE,
					noAsk: false,
					prefetchCount: 1,
					queueOptions: { durable: true },
				},
			},
		]),
	],
	controllers: [PaymentController],
	providers: [...PAYMENTS_SERVICES],
	exports: [ClientsModule],
})
export class PaymentModule {}
