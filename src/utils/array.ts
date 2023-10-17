export function batchArray<T>(arr: T[], batchSize: number): T[][] {
	if (batchSize <= 0) {
		throw new Error('Batch size가 0보다 작거나 같습니다.');
	}

	return Array.from({ length: Math.ceil(arr.length / batchSize) }, (_, i) =>
		arr.slice(i * batchSize, i * batchSize + batchSize),
	);
}

export const range: (start: number, end: number) => number[] = (start, end) => {
	if (start >= end) {
		return [];
	}

	return [...Array(end - start + 1).keys()].map(
		(key: number): number => key + start,
	);
};
