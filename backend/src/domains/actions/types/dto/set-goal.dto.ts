import { Type } from 'class-transformer';
import {
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

export class SetGoalDto {
	@IsNotEmpty()
	@IsNumber()
	goalValue: number;

	@IsNotEmpty()
	@IsDate()
	@Type(() => Date)
	startDate: Date;

	@IsNotEmpty()
	@IsDate()
	@Type(() => Date)
	endDate: Date;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsUUID()
	tagId?: string;

	@IsOptional()
	@IsString()
	comment?: string;
}
