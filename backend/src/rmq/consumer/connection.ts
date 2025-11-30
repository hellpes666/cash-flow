import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';

import client, { Channel, Connection } from 'amqplib';

type HandlerCB<M> = (message: M) => any;

@Injectable()
export class RMQConsumerConnection implements OnModuleDestroy {
	connection!: Connection;
	channel!: Channel;
	private connected!: boolean;

	private rmqUser: string;
	private rmqPass: string;
	private rmqhost: string;

	private readonly logger = new Logger(RMQConsumerConnection.name);

	constructor() {
		this.rmqUser = process.env.RABBITMQ_DEFAULT_USER as string;
		this.rmqPass = process.env.RABBITMQ_DEFAULT_PASS as string;
		this.rmqhost = process.env.RABBITMQ_DEFAULT_HOST as string;
	}

	async connect() {
		if (this.connected && this.channel) {
			return;
		} else {
			this.connected = true;
		}

		try {
			this.logger.log(`⌛️ Connecting to Rabbit-MQ Server`);

			this.connection = await client.connect(
				`amqp://${this.rmqUser}:${this.rmqPass}@${this.rmqhost}:5672`
			);

			this.logger.log(`✅ Rabbit MQ Connection is ready`);

			this.channel = await this.connection.createChannel();

			this.logger.log(`🛸 Created RabbitMQ Channel successfully`);
		} catch (error) {
			this.logger.error(error);
			this.logger.error(`Not connected to MQ Server`);
		}
	}

	async consume<M>(handleIncomingMessage: HandlerCB<M>, queue: string) {
		await this.channel.assertQueue(queue, {
			durable: true,
		});

		this.channel.consume(
			queue,
			(message: M) => {
				{
					if (!message) {
						return this.logger.error(`Invalid incoming message`);
					}

					handleIncomingMessage(message);
					this.channel.ack(message);
				}
			},
			{
				noAck: false,
			}
		);
	}

	async onModuleDestroy() {
		await this.channel?.close();
		await this.connection?.close();
	}
}
