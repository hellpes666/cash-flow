import { Injectable, Logger } from '@nestjs/common';

import { RMQProducerConnection } from './connection';

@Injectable()
export class RMQProdcuerNotification {
	private readonly logger = new Logger(RMQProdcuerNotification.name);

	constructor(private readonly connection: RMQProducerConnection) {}

	public sendNotification = async <N>(notification: N, queue: string) => {
		await this.connection.sendToQueue(queue, notification);

		this.logger.log(`Sent the notification to consumer`);
	};
}
