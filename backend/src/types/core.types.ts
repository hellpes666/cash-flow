interface ISuccessServiceFullResponse<T> {
	isSuccess: true;
	data: T;
}

export interface ISuccessServiceResponse {
	isSuccess: true;
}

interface IFailedServiceResponse {
	isSuccess: false;
}

export type StatusServiceResponseType =
	| ISuccessServiceResponse
	| IFailedServiceResponse;

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
