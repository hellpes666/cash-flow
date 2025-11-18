type CleanUndefined<T> = {
	[K in keyof T]: undefined extends T[K] ? T[K] | null : T[K];
};

export const cleanUndefined = <T extends object>(obj: T): CleanUndefined<T> => {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [
			key,
			value === undefined ? null : value,
		])
	) as CleanUndefined<T>;
};
