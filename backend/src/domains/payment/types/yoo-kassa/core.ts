export interface YooKassaCreatePaymentBody {
	amount: {
		value: string;
		currency: string;
	};
	capture: boolean;
	confirmation: {
		type: 'redirect';
		return_url: string;
	};
	description?: string;
}
