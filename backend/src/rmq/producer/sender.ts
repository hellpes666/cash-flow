import { Injectable } from '@nestjs/common';

import { RMQProdcuerNotification } from './notification';

@Injectable()
export class RMQProducerSender {
	constructor(private readonly notification: RMQProdcuerNotification) {}

	async send<N>(queue: string, notification: N) {
		await this.notification.sendNotification<N>(notification, queue);
	}
}
