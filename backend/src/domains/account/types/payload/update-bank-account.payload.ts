import { CreateBankAccountPayload } from './create-bank-account.payload';

export interface UpdateBankAccountPayload
	extends Partial<CreateBankAccountPayload> {
	id: string;
}
