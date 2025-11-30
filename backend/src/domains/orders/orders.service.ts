import { Injectable } from '@nestjs/common';

import { UserOrder, UserOrderStatus } from 'prisma/generated/prisma';
import { PrismaService, returnBasicAsyncEntity } from 'src/lib';
import { AsyncServiceResponseType } from 'src/types';

import { YooKassaNotificationResponse } from '../payment/types';

import { UpdateOrderPayload } from './types';

@Injectable()
export class OrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	public async createSubscriptionOrder(payload: UpdateOrderPayload) {
		const order = await this.findTheOrder(payload.id);

		if (order) {
			return;
		}

		await this.prismaService.userOrder.create({
			data: payload,
		});

		return;
	}

	public async handleSubscriptionOrder(
		payload: YooKassaNotificationResponse
	) {
		const order = await this.findTheOrder(payload.object.id);

		if (
			!order.isSuccess ||
			(order.isSuccess && order.data.status !== UserOrderStatus.pending)
		) {
			return;
		}

		const orderStatus = payload.object.status;

		await this.prismaService.userOrder.update({
			where: {
				id: payload.object.id,
			},

			data: {
				status: orderStatus,
			},
		});

		return;
	}

	private async findTheOrder(
		orderId: string
	): AsyncServiceResponseType<UserOrder> {
		const order = await this.prismaService.userOrder.findUnique({
			where: {
				id: orderId,
			},
		});

		return returnBasicAsyncEntity(order, 'User Order was not found!');
	}
}
