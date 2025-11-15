import { Injectable } from '@nestjs/common';

import {
	Prisma,
	TransactionAction,
	TransactionType,
	UserGoal,
} from 'prisma/generated/prisma';
import { PrismaService } from 'src/lib';
import {
	AsyncServiceResponseType,
	AsyncSuccessServiceResponse,
} from 'src/types';

import { AccountService } from '../account';

import {
	MINUS_NUMBER_MULTIPLICATOR,
	PLUS_NUMBER_MULTIPLICATOR,
} from './consts';
import {
	SetGoalPayload,
	TransactionPayload,
	TransferValueBetweenBankAccountsPayload,
	UpdateSetGoalPayload,
} from './types';

@Injectable()
export class ActionsService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly accountService: AccountService
	) {}

	public async transferValueBetweenBankAccounts(
		payload: TransferValueBetweenBankAccountsPayload,
		userId: string
	): AsyncSuccessServiceResponse {
		return await this.prismaService.$transaction(async (prismaClient) => {
			const fromAccount = await this.accountService.getBankAccountById(
				payload.fromId,
				userId
			);
			const toAccount = await this.accountService.getBankAccountById(
				payload.toId,
				userId
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
		payload: TransactionPayload,
		userId: string
	): AsyncServiceResponseType<TransactionAction> {
		const isIncome = transactionType === 'income';

		return await this.prismaService.$transaction(async (prismaClient) => {
			const bankAccount = await this.accountService.getBankAccountById(
				payload.bankAccountId,
				userId
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

	//TODO: добавить после нотификашек сюда каждый месяц услонво
	public async setGoal(
		payload: SetGoalPayload,
		userId: string
	): AsyncServiceResponseType<UserGoal> {
		const setGoal = await this.prismaService.userGoal.create({
			data: {
				...payload,
				userId,
			},
		});

		if (setGoal) {
			return {
				isSuccess: true,
				data: setGoal,
			};
		}

		return {
			isSuccess: false,
			errorMessage:
				'Не удалось создать цель! Пожалуйста, попробуйте снова',
		};
	}

	public async updateSetGoal(
		payload: UpdateSetGoalPayload,
		userId: string
	): AsyncServiceResponseType<UserGoal> {
		const userGoal = await this.findSetGoal({ userId, id: payload.id });

		if (!userGoal.isSuccess) {
			return userGoal;
		}

		const updatedUserGoal = await this.prismaService.userGoal.update({
			where: {
				id: userGoal.data.id,
			},

			data: {
				...payload,
			},
		});

		if (updatedUserGoal) {
			return {
				isSuccess: true,
				data: updatedUserGoal,
			};
		}

		return { isSuccess: false, errorMessage: 'Не удалось обновить цель' };
	}

	//TODO вынести во что-то общее
	private async findSetGoal(
		query: Prisma.UserGoalWhereUniqueInput
	): AsyncServiceResponseType<UserGoal> {
		const userGoal = await this.prismaService.userGoal.findUnique({
			where: query,
		});

		if (userGoal) {
			return {
				isSuccess: true,
				data: userGoal,
			};
		}

		return {
			isSuccess: false,
			errorMessage: 'Цель не найдена',
		};
	}
}
