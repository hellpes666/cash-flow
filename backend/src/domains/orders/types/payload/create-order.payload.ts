import { UserOrderStatus } from 'prisma/generated/prisma';

export class CreateOrderPayload {
	value: string;
	currency: string;
	status: UserOrderStatus;
	userId: string;

	description?: string;
}
