import { UserOrderStatus } from 'prisma/generated/prisma';
import { YooKassaErrorCode } from 'src/domains/payment/constants';

export interface YooKassaErrorResponse {
	type: 'error';
	id: string;
	code: YooKassaErrorCode;
	description?: string;
	parameter?: string;
}

interface YooKassaPaymentAmount {
	amount: {
		value: string;
		currency: string;
	};
}

export interface YooKassaPaymentRedirectResponse extends YooKassaPaymentAmount {
	id: string;
	status: UserOrderStatus;
	paid: boolean;
	confirmation: {
		type: string;
		confirmation_url: string;
	};
	created_at: string;
	description?: string;
	metadata?: Record<string, any>;
	recipient: {
		account_id: string;
		gateway_id: string;
	};
	refundable: boolean;
	test: boolean;
}

interface YooKassaNotificationObject extends YooKassaPaymentAmount {
	id: string;
	status: UserOrderStatus;

	income_amount: {
		value: string;
		currency: 'RUB';
	};
	description: string;
	recipient: {
		account_id: string;
		gateway_id: string;
	};
	payment_method: {
		type: 'yoo_money';
		id: string;
		saved: boolean;
		status: 'inactive';
		title: string;
		account_number: string;
	};
	captured_at: string;
	created_at: string;
	test: boolean;
	refunded_amount: {
		value: string;
		currency: 'RUB';
	};
	paid: boolean;
	refundable: boolean;
	metadata: Record<string, unknown>;
}

export interface YooKassaNotificationResponse {
	event: `payment.${UserOrderStatus}`;
	object: YooKassaNotificationObject;
}
