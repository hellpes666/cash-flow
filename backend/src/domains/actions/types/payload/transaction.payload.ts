export interface TransactionPayload {
	bankAccountId: string;

	value: number;

	categoryId?: string;
	tagId?: string;
	comment?: string;
}
