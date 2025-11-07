export interface TransactionPayload {
	userId: string;

	bankAccountId: string;

	value: number;

	categoryId?: string;
	tagId?: string;
	comment?: string;
}
