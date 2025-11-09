import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { BankAccount } from 'prisma/generated/prisma';
import { AsyncServiceResponseType } from 'src/types';

import { AccountService } from './account.service';
import { CreateBankAccountDto, UpdateBankAccountDto } from './types';

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

	@Put('/:id')
	public async updateBankAccount(
		@Param('id') id: string,
		@Body() dto: UpdateBankAccountDto
	): AsyncServiceResponseType<BankAccount> {
		const extendedDto = { ...dto, id };

		const updatedBankAccount =
			await this.accountService.updateBankAccount(extendedDto);

		return updatedBankAccount;
	}

	@Get('/:id')
	public async getBankAccount(
		@Param('id') id: string
	): AsyncServiceResponseType<BankAccount> {
		const bankAccount = await this.accountService.getBankAccountById(id);

		return bankAccount;
	}
}
