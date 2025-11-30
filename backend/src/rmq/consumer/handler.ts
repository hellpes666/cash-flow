import { Injectable, Logger } from '@nestjs/common';

import { RMQConsumerConnection } from './connection';

@Injectable()
export class RMQConsumerHandler {
	private readonly logger = new Logger(RMQConsumerHandler.name);

	constructor(private readonly connection: RMQConsumerConnection) {}

	public listen = async (queue: string) => {
		await this.connection.connect();

		await this.connection.consume(this.handleIncomingNotification, queue);
	};

	private handleIncomingNotification = <M>(message: M) => {
		try {
			this.logger.log(
				`Received Notification: ${JSON.stringify(message)}`
			);
		} catch (error: unknown) {
			this.logger.error(
				`Error While Parsing the message: ${error instanceof Error ? error.message : ''}`
			);
		}
	};
}
