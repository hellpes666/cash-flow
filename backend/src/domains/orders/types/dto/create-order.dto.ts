import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserOrderStatus } from 'prisma/generated/prisma';

export class CreateOrderDto {
	@IsString()
	value: string;

	@IsString()
	currency: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsEnum(UserOrderStatus)
	status: UserOrderStatus;

	@IsUUID()
	userId: string;
}
