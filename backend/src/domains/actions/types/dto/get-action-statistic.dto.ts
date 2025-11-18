import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class GetActionStatisticDto {
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	startDate?: Date;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	endDate?: Date;

	@IsOptional()
	@IsString()
	bankAccountId?: string;

	@IsArray()
	@IsString({ each: true })
	categoryIds: string[];

	@IsArray()
	@IsString({ each: true })
	transactionTags: string[];
}
