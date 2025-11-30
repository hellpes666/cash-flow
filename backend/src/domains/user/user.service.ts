import { Injectable } from '@nestjs/common';

import { UserOrder } from 'prisma/generated/prisma';
import { PrismaService, returnBasicAsyncEntity } from 'src/lib';
import { AsyncServiceResponseType } from 'src/types';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	public async isUserHasSubscription(
		userId: string
	): AsyncServiceResponseType<UserOrder> {
		const subscription = await this.prismaService.userOrder.findFirst({
			where: {
				userId,
			},
		});

		return returnBasicAsyncEntity(
			subscription,
			'Subscription was not found!'
		);
	}
}
