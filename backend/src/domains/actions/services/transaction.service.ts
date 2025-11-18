import { Injectable } from '@nestjs/common';

import { TransactionAction, TransactionType } from 'prisma/generated/prisma';
import { PrismaService, cleanUndefined } from 'src/lib';
import { AsyncServiceResponseType } from 'src/types';

import { AccountService } from '../../account';
import {
	MINUS_NUMBER_MULTIPLICATOR,
	PLUS_NUMBER_MULTIPLICATOR,
} from '../consts';
import { TransactionPayload } from '../types';

@Injectable()
export class TransactionService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly accountService: AccountService
	) {}

	public async transactionAction(
		transactionType: TransactionType,
		payload: TransactionPayload,
		userId: string
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

				const cleanedPayload =
					cleanUndefined<TransactionPayload>(payload);

				const data = await prismaClient.transactionAction.create({
					data: {
						type: transactionType,
						userId,
						...cleanedPayload,
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
