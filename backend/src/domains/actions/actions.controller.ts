import {
	Body,
	Controller,
	Param,
	Patch,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';

import { TransactionType } from 'prisma/generated/prisma';
import { GetUserData } from 'src/decorators';

import { AuthGuard } from '../auth';

import { ActionsService } from './actions.service';
import {
	SetGoalDto,
	TransactionDto,
	TransferValueBetweenBankAccountsDto,
	UpdateSetGoalDto,
} from './types';

@UseGuards(AuthGuard)
@Controller('actions')
export class ActionsController {
	constructor(private readonly actionsService: ActionsService) {}

	@Patch('bank-accounts/transfer')
	public async transferValueBetweenBankAccounts(
		@GetUserData('id') userId: string,
		@Body() dto: TransferValueBetweenBankAccountsDto
	) {
		return await this.actionsService.transferValueBetweenBankAccounts(
			dto,
			userId
		);
	}

	@Post('transaction/:action')
	public async transferValue(
		@GetUserData('id') userId: string,
		@Param('action') action: TransactionType,
		@Body() dto: TransactionDto
	) {
		return await this.actionsService.transactionAction(action, dto, userId);
	}

	@Post('set-goal')
	public async setGoal(
		@GetUserData('id') userId: string,
		@Body() dto: SetGoalDto
	) {
		return await this.actionsService.setGoal(dto, userId);
	}

	@Put('set-goal/:id')
	public async updateSetGoal(
		@GetUserData('id') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateSetGoalDto
	) {
		const extendedPayload = { ...dto, id };
		return await this.actionsService.updateSetGoal(extendedPayload, userId);
	}
}
