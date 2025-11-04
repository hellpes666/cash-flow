import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { BankAccount } from 'prisma/generated/prisma';
import { AsyncServiceResponseType } from 'src/types';

import { AccountService } from './account.service';
import { CreateBankAccountDto } from './types';

@Controller('bank-accounts')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('')
	public async createBankAccount(
		@Body() dto: CreateBankAccountDto
	): AsyncServiceResponseType<BankAccount> {
		const createdBankAccount =
			await this.accountService.createBankAccount(dto);

		return createdBankAccount;
	}

	@Get('/:id')
	public async getBankAccount(@Param('id') id: string) {
		const bankAccount = await this.accountService.getBankAccountById(id);

		return bankAccount;
	}
}
