import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class TransferValueBetweenBankAccountsDto {
	@IsNotEmpty()
	@IsUUID()
	userId: string;

	@IsNotEmpty()
	@IsUUID()
	fromId: string;

	@IsNotEmpty()
	@IsUUID()
	toId: string;

	@IsOptional()
	@IsNumber()
	value: number;
}
