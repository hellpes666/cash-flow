import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { TransactionType } from 'prisma/generated/prisma';

import { ActionsService } from './actions.service';
import { TransactionDto, TransferValueBetweenBankAccountsDto } from './types';

@Controller('actions')
export class ActionsController {
	constructor(private readonly actionsService: ActionsService) {}

	@Patch('bank-accounts/transfer')
	public async transferValueBetweenBankAccounts(
		@Body() dto: TransferValueBetweenBankAccountsDto
	) {
		return await this.actionsService.transferValueBetweenBankAccounts(dto);
	}

	@Post('transaction/:action')
	public async transferValue(
		@Param('action') action: TransactionType,
		@Body() dto: TransactionDto
	) {
		return await this.actionsService.transactionAction(action, dto);
	}
}
