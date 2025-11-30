import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { RmqOrderEvents } from 'src/lib';

import { YooKassaNotificationResponse } from '../payment/types';

import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './types';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@EventPattern(RmqOrderEvents.CREATE_ORDER)
	public async handleCreateSubscriptionOrder(
		@Payload() dto: UpdateOrderDto,
		@Ctx() context: RmqContext
	) {
		await this.ordersService.createSubscriptionOrder(dto);

		const channel = context.getChannelRef();
		const originalMsg = context.getMessage();
		channel.ack(originalMsg);
	}

	@EventPattern(RmqOrderEvents.HANDLE_YOO_KASSA_RESPONSE)
	public async handleSubscriptionOrderResponse(
		@Payload() dto: YooKassaNotificationResponse,
		@Ctx() context: RmqContext
	) {
		await this.ordersService.handleSubscriptionOrder(dto);

		const channel = context.getChannelRef();
		const originalMsg = context.getMessage();
		channel.ack(originalMsg);
	}
}
