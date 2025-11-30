import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { GetUserData } from 'src/decorators';
import { RMQ_ORDERS_SERVICE, RmqOrderEvents } from 'src/lib';

import { AuthGuard } from '../auth';

import {
	CheckWebHookValidationGuard,
	IsUserSubscriptionActiveGuard,
} from './guards';
import { YooKassaService } from './services';
import { YooKassaNotificationResponse } from './types';

@Controller('payments')
export class PaymentController {
	public constructor(
		private readonly yooKassaService: YooKassaService,
		@Inject(RMQ_ORDERS_SERVICE) private billingClient: ClientProxy
	) {}

	@Post('yoo-kassa/payment-redirect')
	@UseGuards(AuthGuard)
	public async createYooKassaPaymentRedirect(
		@GetUserData('id') userId: string
	) {
		const createdPayment = await this.yooKassaService.createPayment(userId);

		return createdPayment;
	}

	@Get()
	@UseGuards(AuthGuard, IsUserSubscriptionActiveGuard)
	public test() {
		return 'success';
	}

	@Post('yoo-kassa/payment-redirect/webhook')
	@UseGuards(CheckWebHookValidationGuard)
	public handleWebhook(@Body() payload: YooKassaNotificationResponse) {
		this.billingClient.emit(
			RmqOrderEvents.HANDLE_YOO_KASSA_RESPONSE,
			payload
		);
	}
}
