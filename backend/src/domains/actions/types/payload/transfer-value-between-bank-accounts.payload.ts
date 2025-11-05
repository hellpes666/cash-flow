export interface TransferValueBetweenBankAccountsPayload {
	userId: string;
	fromId: string;
	toId: string;
	value: number;
}
