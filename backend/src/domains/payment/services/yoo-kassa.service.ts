import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

import axios, { AxiosRequestConfig } from 'axios';
import { UpdateOrderPayload } from 'src/domains/orders';
import { RMQ_ORDERS_SERVICE, RmqOrderEvents } from 'src/lib';
import { AsyncServiceResponseType } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

import { YOO_KASSA_BASE_API_URL, YooKassaRoutes } from '../constants';
import {
	YooKassaCreatePaymentBody,
	YooKassaErrorResponse,
	YooKassaPaymentRedirectResponse,
} from '../types';

@Injectable()
export class YooKassaService {
	constructor(
		private readonly configService: ConfigService,
		@Inject(RMQ_ORDERS_SERVICE) private ordersClient: ClientProxy
	) {}

	public async createPayment(
		userId: string
	): AsyncServiceResponseType<YooKassaPaymentRedirectResponse> {
		const body: YooKassaCreatePaymentBody = {
			amount: {
				value: '100.00',
				currency: 'RUB',
			},
			capture: true,
			confirmation: {
				type: 'redirect',
				return_url: 'https://www.example.com/return_url',
			},
			description: 'Заказ №1',
		};

		const config: AxiosRequestConfig<{
			'Idempotence-Key': string;
			Authorization: string;
		}> = {
			headers: {
				...this.configureAuthorizationHeader(),
				...this.generateIdempotenceKey(),
			},
		};
		const url = YOO_KASSA_BASE_API_URL + YooKassaRoutes.PAYMENTS;

		try {
			const response = await axios.post<YooKassaPaymentRedirectResponse>(
				url,
				body,
				config
			);

			const responseData: YooKassaPaymentRedirectResponse = response.data;
			const { amount, description, status, id } = responseData;
			const { value, currency } = amount;

			const messagePayload: UpdateOrderPayload = {
				id,
				value,
				currency,
				description,
				status,
				userId,
			};

			this.ordersClient.emit(RmqOrderEvents.CREATE_ORDER, messagePayload);

			return { isSuccess: true, data: response.data };
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				const errData = error.response.data as YooKassaErrorResponse;

				return {
					isSuccess: false,
					errorMessage: ` ${errData.description}`,
					errorCode: errData.code,
				};
			}

			throw new Error('Failed to create payment: ' + error);
		}
	}

	private generateIdempotenceKey() {
		return {
			'Idempotence-Key': uuidv4(),
		};
	}

	private configureAuthorizationHeader() {
		const shopId =
			this.configService.getOrThrow<string>('YOO_MONEY_SHOP_ID');
		const secretKey = this.configService.getOrThrow<string>(
			'YOO_MONEY_SECRET_KEY'
		);
		const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');
		return {
			Authorization: `Basic ${auth}`,
		};
	}
}
