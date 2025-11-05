import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/lib';
import { AsyncSuccessServiceResponse } from 'src/types';

import { AccountService } from '../account';

import { TransferValueBetweenBankAccountsPayload } from './types';

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
}
