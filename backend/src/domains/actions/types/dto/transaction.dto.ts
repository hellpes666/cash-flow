import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

export class TransactionDto {
	@IsNotEmpty()
	@IsUUID()
	userId: string;

	@IsNotEmpty()
	@IsUUID()
	bankAccountId: string;

	@IsNotEmpty()
	@IsNumber()
	value: number;

	@IsOptional()
	@IsUUID()
	categoryId?: string;

	@IsOptional()
	@IsUUID()
	tagId?: string;

	@IsOptional()
	@IsString()
	comment?: string;
}
