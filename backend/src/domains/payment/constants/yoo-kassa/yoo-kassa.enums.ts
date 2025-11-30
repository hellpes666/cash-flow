export const YOO_KASSA_BASE_API_URL = 'https://api.yookassa.ru/v3';

export enum YooKassaErrorCode {
	InvalidRequest = 'invalid_request',
	InvalidCredentials = 'invalid_credentials',
	Forbidden = 'forbidden',
	NotFound = 'not_found',
	TooManyRequests = 'too_many_requests',
	InternalServerError = 'internal_server_error',
}

export enum YooKassaRoutes {
	PAYMENTS = '/payments',
}
