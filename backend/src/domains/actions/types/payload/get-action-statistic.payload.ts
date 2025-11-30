export interface GetActionStatisticPayload {
	startDate?: Date;
	endDate?: Date;
	bankAccountId?: string;
	categoryIds: string[];
	transactionTags: string[];
}
