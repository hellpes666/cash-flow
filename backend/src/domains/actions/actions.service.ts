import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/lib';
import {
	AsyncServiceResponseType,
	AsyncSuccessServiceResponse,
} from 'src/types';

import { TransactionAction, TransactionType } from 'prisma/generated/prisma';

import { AccountService } from '../account';

import {
	MINUS_NUMBER_MULTIPLICATOR,
	PLUS_NUMBER_MULTIPLICATOR,
} from './consts';
import {
	TransactionPayload,
	TransferValueBetweenBankAccountsPayload,
} from './types';

@Injectable()
export class ActionsService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly accountService: AccountService
	) {}

	public async transferValueBetweenBankAccounts(
		payload: TransferValueBetweenBankAccountsPayload
	): AsyncSuccessServiceResponse {
		return await this.prismaService.$transaction(async (prismaClient) => {
			const fromAccount = await this.accountService.getBankAccountById(
				payload.fromId
			);
			const toAccount = await this.accountService.getBankAccountById(
				payload.toId
			);

			if (fromAccount.isSuccess && toAccount.isSuccess) {
				const toAccountData = toAccount.data;
				const fromAccountData = fromAccount.data;

				const newFromBalance = fromAccountData.balance - payload.value;
				const newToBalance = toAccountData.balance + payload.value;

				await prismaClient.bankAccount.update({
					where: { id: payload.fromId },
					data: { balance: newFromBalance },
				});

				await prismaClient.bankAccount.update({
					where: { id: payload.toId },
					data: {
						balance: newToBalance,
					},
				});
			}

			return { isSuccess: true };

			//TODO сделать для статистики Balance отдельной сущностью
			// Списание
			// await prismaClient.bankAccount.update({
			// 	where: { id: payload.fromId },
			// 	data: { balance: { decrement: payload.amount } },
			// });

			// Зачисление
			// await prismaClient.bankAccount.update({
			// 	where: { id: payload.toId },
			// 	data: { balance: { increment: payload.amount } },
			// });
		});
	}

	public async transactionAction(
		transactionType: TransactionType,
		payload: TransactionPayload
	): AsyncServiceResponseType<TransactionAction> {
		const isIncome = transactionType === 'income';

		return await this.prismaService.$transaction(async (prismaClient) => {
			const bankAccount = await this.accountService.getBankAccountById(
				payload.bankAccountId
			);

			if (bankAccount.isSuccess) {
				const bankAccountData = bankAccount.data;
				const multiplicator = isIncome
					? PLUS_NUMBER_MULTIPLICATOR
					: MINUS_NUMBER_MULTIPLICATOR;

				const newBalance =
					bankAccountData.balance + multiplicator * payload.value;

				await prismaClient.bankAccount.update({
					where: { id: payload.bankAccountId },
					data: { balance: newBalance },
				});

				const data = await prismaClient.transactionAction.create({
					data: {
						type: transactionType,
						...payload,
					},
				});

				return { isSuccess: true, data };
			}

			return {
				isSuccess: false,
				errorMessage: `Не получилось провести операцию: ${bankAccount.errorMessage}`,
			};
		});
	}
}
