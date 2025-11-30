import { BankAccountType } from 'prisma/generated/prisma';

export interface CreateBankAccountPayload {
	name: string;
	type: BankAccountType;

	balance?: number;
}
