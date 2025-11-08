import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/lib';
import { AsyncServiceResponseType } from 'src/types';

import { BankAccount } from 'prisma/generated/prisma';

import { CreateBankAccountPayload, UpdateBankAccountPayload } from './types';

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService) {}

	//TODO после реги добавить сюда проверку на пользвоаетля
	public async createBankAccount(
		payload: CreateBankAccountPayload
	): AsyncServiceResponseType<BankAccount> {
		const bankAccount = await this.prismaService.bankAccount.create({
			data: {
				...payload,
			},
		});

		return {
			isSuccess: true,
			data: bankAccount,
		};
	}

	public async updateBankAccount(
		payload: UpdateBankAccountPayload
	): AsyncServiceResponseType<BankAccount> {
		const bankAccount = await this.prismaService.bankAccount.update({
			where: {
				id: payload.id,
			},
			data: {
				...payload,
			},
		});

		return {
			isSuccess: true,
			data: bankAccount,
		};
	}

	public async deleteBankAccount(
		id: string
	): AsyncServiceResponseType<BankAccount> {
		const bankAccount = await this.getBankAccountById(id);

		if (bankAccount.isSuccess) {
			const deletedBankAccount =
				await this.prismaService.bankAccount.delete({
					where: { id },
				});

			return {
				isSuccess: true,
				data: deletedBankAccount,
			};
		}

		return {
			isSuccess: false,
			errorMessage: 'Unexcepted Error, please contact us',
		};
	}

	public async getBankAccountById(
		id: string
	): AsyncServiceResponseType<BankAccount> {
		const bankAccount = await this.prismaService.bankAccount.findUnique({
			where: {
				id,
			},
		});

		if (bankAccount) {
			return {
				isSuccess: true,
				data: bankAccount,
			};
		}

		return {
			isSuccess: false,
			errorMessage: 'Bank Account was not found!',
		};
	}
}
