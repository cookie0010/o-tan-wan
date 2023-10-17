import { delay } from '@/utils/time';

export async function withRetry<T>(
	fn: () => Promise<T>,
	maxRetries: number,
	delayMs: number,
	currentRetry: number = 0,
): Promise<T> {
	try {
		return await fn();
	} catch (error) {
		if (!(error instanceof Error)) {
			throw new Error('알 수 없는 에러');
		}
		if (currentRetry < maxRetries - 1) {
			console.warn(
				`${
					currentRetry + 1
				}번의 재시도를 실패했습니다. ${delayMs}ms 뒤에 재시도합니다. Error: ${
					error.message
				}`,
			);

			await delay(delayMs);
			return withRetry(fn, maxRetries, delayMs, currentRetry + 1);
		}

		console.error(
			`${maxRetries}번의 재시도를 실패했습니다. Error: ${error.message}`,
		);

		throw error;
	}
}
