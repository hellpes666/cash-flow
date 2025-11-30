import { AsyncServiceResponseType } from 'src/types';

export const returnBasicAsyncEntity = <E>(
	entity: E | null,
	errorMessage?: string,
	errorCode?: string
): AsyncServiceResponseType<E> => {
	if (entity) {
		return Promise.resolve({
			isSuccess: true,
			data: entity,
		});
	}

	return Promise.resolve({
		isSuccess: false,
		errorMessage: errorMessage || 'Default error message',
		errorCode: errorCode || '',
	});
};
