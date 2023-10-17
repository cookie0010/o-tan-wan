export type PadOption = {
	length?: number;
	fillString?: string | number;
};

export function pad(
	str: number | string,
	{ length = 2, fillString = '0' }: PadOption = {},
) {
	return String(str).padStart(length, String(fillString));
}
