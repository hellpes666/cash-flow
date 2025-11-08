interface ISuccessServiceFullResponse<T> {
	isSuccess: true;
	data: T;
}

export interface ISuccessServiceResponse {
	isSuccess: true;
}

export type AsyncSuccessServiceResponse = Promise<ISuccessServiceResponse>;

interface IErrorServiceResponse {
	isSuccess: false;
	errorMessage: string;
	errorCode?: string;
}

export type ServiceResponseType<T> =
	| ISuccessServiceFullResponse<T>
	| IErrorServiceResponse;

export type AsyncServiceResponseType<T> = Promise<ServiceResponseType<T>>;
