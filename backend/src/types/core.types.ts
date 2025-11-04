interface ISuccessServiceResponse<T> {
	isSuccess: true;
	data: T;
}
interface IErrorServiceResponse {
	isSuccess: false;
	errorMessage: string;
	errorCode?: string;
}

export type ServiceResponseType<T> =
	| ISuccessServiceResponse<T>
	| IErrorServiceResponse;

export type AsyncServiceResponseType<T> = Promise<ServiceResponseType<T>>;
