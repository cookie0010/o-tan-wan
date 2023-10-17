import { pad } from '@/utils/string';

export const delay = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export function getTimeStamp(date: Date = new Date()) {
	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}
