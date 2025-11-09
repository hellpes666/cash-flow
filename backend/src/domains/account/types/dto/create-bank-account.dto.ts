import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

import { BankAccountType } from 'prisma/generated/prisma';

export class CreateBankAccountDto {
	@IsNotEmpty()
	@IsUUID()
	userId: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEnum(BankAccountType)
	type: BankAccountType;

	@IsOptional()
	@IsNumber()
	balance?: number;
}
