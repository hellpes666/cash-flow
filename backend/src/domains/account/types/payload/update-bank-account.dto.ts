import { CreateBankAccountPayload } from './create-bank-account.dto';

export interface UpdateBankAccountPayload
	extends Partial<CreateBankAccountPayload> {
	id: string;
}
