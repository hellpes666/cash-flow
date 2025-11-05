import { Body, Controller, Patch } from '@nestjs/common';

import { ActionsService } from './actions.service';
import { TransferValueBetweenBankAccountsDto } from './types';

@Controller('actions')
export class ActionsController {
	constructor(private readonly actionsService: ActionsService) {}

	@Patch('bank-accounts/transfer')
	public async transferValueBetweenBankAccounts(
		@Body() dto: TransferValueBetweenBankAccountsDto
	) {
		return await this.actionsService.transferValueBetweenBankAccounts(dto);
	}
}
