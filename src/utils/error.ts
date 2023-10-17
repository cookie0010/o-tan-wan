/* eslint-disable max-classes-per-file */

export class FetchError extends Error {
	constructor(
		public status: number,
		message?: string,
	) {
		super(message);
		this.name = 'FetchError';
	}
}

export class HttpError extends FetchError {
	constructor(status: number, message: string) {
		super(status, message);
		this.name = 'HttpError';
	}
}

export class NotFoundError extends HttpError {
	constructor(message: string) {
		super(404, message);
		this.name = 'NotFoundError';
	}
}

export class ServerError extends HttpError {
	constructor(
		status: number,
		message: string,
		public response: Response,
	) {
		super(status, message);
		this.response = response;
		this.name = 'ServerError';
	}
}

export class TimeoutError extends Error {
	constructor() {
		super('요청 시간이 초과되었습니다.');
		this.name = 'TimeoutError';
	}
}
