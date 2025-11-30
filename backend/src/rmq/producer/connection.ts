import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';

import client, { Channel, Connection } from 'amqplib';

@Injectable()
export class RMQProducerConnection implements OnModuleDestroy {
	connection!: Connection;
	channel!: Channel;
	private connected!: boolean;

	private rmqUser: string;
	private rmqPass: string;
	private rmqhost: string;

	private readonly logger = new Logger(RMQProducerConnection.name);

	constructor() {
		this.rmqUser = process.env.RABBITMQ_DEFAULT_USER as string;
		this.rmqPass = process.env.RABBITMQ_DEFAULT_PASS as string;
		this.rmqhost = process.env.RABBITMQ_DEFAULT_HOST as string;
	}

	async connect() {
		if (this.connected && this.channel) {
			return;
		}

		try {
			this.logger.log(`⌛️ Connecting to Rabbit-MQ Server`);

			this.connection = await client.connect(
				`amqp://${this.rmqUser}:${this.rmqPass}@${this.rmqhost}:5672`
			);
			this.connected = true;

			this.logger.log(`✅ Rabbit MQ Connection is ready`);

			this.channel = await this.connection.createChannel();

			this.logger.log(`🛸 Created RabbitMQ Channel successfully`);
		} catch (error) {
			this.logger.error(error);
			this.logger.error(`Not connected to MQ Server`);
		}
	}

	async sendToQueue<T>(queue: string, message: T) {
		try {
			if (!this.channel) {
				await this.connect();
			}

			this.channel.sendToQueue(
				queue,
				Buffer.from(JSON.stringify(message))
			);
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async onModuleDestroy() {
		await this.channel?.close();
		await this.connection?.close();
	}
}
