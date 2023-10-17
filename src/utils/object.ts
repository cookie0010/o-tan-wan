export function getKeyByValue<T extends { [key: string]: V }, V>(
	obj: T,
	value: V,
): string | undefined {
	return Object.keys(obj).find((key) => obj[key] === value);
}

/**
 * Check if provided parameter is plain object
 * @param item
 * @returns boolean
 */

export function isObject(item: unknown): item is Record<string, unknown> {
	return (
		item !== null && typeof item === 'object' && item.constructor === Object
	);
}

export function cloneDeep<T>(source: T) {
	if (!isObject(source)) {
		return source;
	}

	const output = { ...source };

	Object.keys(source).forEach((key) => {
		(output as Record<string, unknown>)[key] = cloneDeep(source[key]);
	});

	return output;
}

export function mergeDeep<T extends object, S extends object>(
	target: T,
	source: S,
): T & S {
	if (isObject(source) && Object.keys(source).length === 0) {
		return cloneDeep({ ...target, ...source });
	}

	const output = { ...target, ...source };

	if (isObject(source) && isObject(target)) {
		Object.keys(source).forEach((key) => {
			if (isObject(source[key]) && key in target && isObject(target[key])) {
				(output as Record<string, unknown>)[key] = mergeDeep(
					target[key] as object,
					source[key] as object,
				);
			} else {
				(output as Record<string, unknown>)[key] = isObject(source[key])
					? cloneDeep(source[key])
					: source[key];
			}
		});
	}

	return output;
}

export const omit =
	<T extends object, K extends string>(keys: readonly K[]) =>
	(obj: T): Omit<T, K> => {
		const result = {} as Omit<T, K>;
		Object.keys(obj).forEach((key) => {
			// @ts-expect-error - Somehow TS does not like this.
			if (keys.includes(key)) {
				return;
			}
			// @ts-expect-error - Somehow TS does not like this.
			result[key] = obj[key];
		});
		return result;
	};

export function typedEntries<T extends Record<string, unknown>>(
	obj: T,
): [keyof T, T[keyof T]][] {
	return Object.entries(obj) as [keyof T, T[keyof T]][];
}
