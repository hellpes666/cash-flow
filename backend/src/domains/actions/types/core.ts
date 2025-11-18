import { Prisma } from 'prisma/generated/prisma';

export type TransactionActionWithRelations =
	Prisma.TransactionActionGetPayload<{
		include: {
			category: {
				select: {
					id: true;
					name: true;
					icon: true;
					color: true;
				};
			};
			tag: {
				select: {
					id: true;
					name: true;
				};
			};
			bankAccount: {
				select: {
					id: true;
					name: true;
					type: true;
					balance: true;
					createdAt: true;
				};
			};
		};
	}>;
