import { Injectable } from '@nestjs/common';

import { Prisma, TransactionType } from 'prisma/generated/prisma';
import { PrismaService } from 'src/lib';
import { AsyncServiceResponseType } from 'src/types';

import {
	GetActionStatisticPayload,
	TransactionActionWithRelations,
} from '../types';

//TODO доделать скорее всего все типы пойдут впизду
@Injectable()
export class StatisticsService {
	constructor(private readonly prisma: PrismaService) {}

	public async getCommonStatistic(
		payload: GetActionStatisticPayload
	): AsyncServiceResponseType<TransactionActionWithRelations[]> {
		const filters = this.buildFilters(payload);
		const defaultOrderBy = this.getDefaultStatisticOrderBy();
		const defaultIncludeEntitites = this.getTransactionInclude();

		const result = await this.prisma.transactionAction.findMany({
			where: { AND: filters },
			...defaultIncludeEntitites,
			...defaultOrderBy,
		});

		return { isSuccess: true, data: result };
	}

	private getTransactionInclude() {
		const transactionInclude =
			Prisma.validator<Prisma.TransactionActionDefaultArgs>()({
				include: {
					category: {
						select: {
							id: true,
							name: true,
							icon: true,
							color: true,
						},
					},
					tag: {
						select: {
							id: true,
							name: true,
						},
					},
					bankAccount: {
						select: {
							id: true,
							name: true,
							type: true,
							balance: true,
							createdAt: true,
						},
					},
				},
			});
		return transactionInclude;
	}

	private getDefaultStatisticOrderBy() {
		const defaultOrderBy = {
			orderBy: {
				createdAt: Prisma.SortOrder.asc,
			},
		};

		return defaultOrderBy;
	}

	private buildFilters(payload: GetActionStatisticPayload) {
		const filters: Prisma.TransactionActionWhereInput[] = [];
		if (payload.startDate) {
			filters.push({ createdAt: { gte: payload.startDate } });
		}
		if (payload.endDate) {
			filters.push({ createdAt: { lte: payload.endDate } });
		}
		if (payload.categoryIds.length > 0) {
			filters.push({ categoryId: { in: payload.categoryIds } });
		}
		if (payload.transactionTags.length > 0) {
			filters.push({ tagId: { in: payload.transactionTags } });
		}
		if (payload.bankAccountId) {
			filters.push({ bankAccountId: { equals: payload.bankAccountId } });
		}

		//TODO перенести по типу проверку устроить
		filters.push({ type: { equals: TransactionType.expense } });
		filters.push({ type: { equals: TransactionType.income } });

		return filters;
	}
}
