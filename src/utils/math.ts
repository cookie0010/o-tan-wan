export function round(num: number, digits = 0) {
	const factor = 10 ** digits;

	return Math.round(num * factor) / factor;
}

export function getPercentage(part: number, total: number) {
	return (part / total) * 100;
}
