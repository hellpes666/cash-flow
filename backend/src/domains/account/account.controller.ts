import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';

import { BankAccount } from 'prisma/generated/prisma';
import { GetUserData } from 'src/decorators';
import { AsyncServiceResponseType } from 'src/types';

import { AuthGuard } from '../auth';

import { AccountService } from './account.service';
import { CreateBankAccountDto, UpdateBankAccountDto } from './types';

@UseGuards(AuthGuard)
@Controller('bank-accounts')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('')
	public async createBankAccount(
		@GetUserData('id') userId: string,
		@Body() dto: CreateBankAccountDto
	): AsyncServiceResponseType<BankAccount> {
		const createdBankAccount = await this.accountService.createBankAccount(
			dto,
			userId
		);

		return createdBankAccount;
	}

	@Put('/:id')
	public async updateBankAccount(
		@Param('id') id: string,
		@GetUserData('id') userId: string,
		@Body() dto: UpdateBankAccountDto
	): AsyncServiceResponseType<BankAccount> {
		const extendedDto = { ...dto, id };

		const updatedBankAccount = await this.accountService.updateBankAccount(
			extendedDto,
			userId
		);

		return updatedBankAccount;
	}

	@Get('/:id')
	public async getBankAccount(
		@GetUserData('id') userId: string,
		@Param('id') id: string
	): AsyncServiceResponseType<BankAccount> {
		const bankAccount = await this.accountService.getBankAccountById(
			id,
			userId
		);

		return bankAccount;
	}
}
