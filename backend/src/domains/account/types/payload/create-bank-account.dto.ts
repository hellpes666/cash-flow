import { BankAccountType } from 'prisma/generated/prisma';

export interface CreateBankAccountPayload {
	userId: string;
	name: string;
	type: BankAccountType;

	initialValue?: number;
}
