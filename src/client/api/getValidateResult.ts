import { EventType, ValidatedResult } from '@/types';
import { BASE_URL } from '@/client/constant/url';

export default async function getValidateResult(
	file: File,
	eventType: EventType,
): Promise<ValidatedResult> {
	try {
		const formData = new FormData();
		formData.append('file', file);
		console.log(formData);
		const url = `${BASE_URL}/${eventType}`;

		const response = await fetch(`${url}`, {
			method: 'POST',
			body: formData,
			credentials: 'include',
		});

		if (!response.ok) throw new Error('유효하지 않은 이미지입니다.');

		return response.json();
	} catch (e) {
		alert('유효하지 않은 이미지입니다.');
		throw e;
	}
}
