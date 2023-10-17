import {
    FetchError,
    HttpError,
    NotFoundError,
    ServerError,
    TimeoutError,
} from '@/utils/error';

type ErrorRes = {
    msg: string;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type FetchOptions<Req> = Omit<RequestInit, 'body' | 'headers'> & {
    method?: HttpMethod;
    timeout?: number;
    body?: Req;
    headers?: HeadersInit;
    credentials?: RequestCredentials;
};


export default async function fetcher<Req, Res>(
    url: string,
    { method, timeout = 7000, body, next, ...options }: FetchOptions<Req> = {},
): Promise<Res> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            method: method || 'GET',
            signal: controller.signal,
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            credentials: options.credentials || 'include',
            next: next || undefined,
        });

        if (!response.ok) {
            let serverMessage = '에러가 발생했습니다.'; // default error message

            try {
                const responseBody = (await response.json()) as ErrorRes;
                serverMessage = responseBody.msg || serverMessage;
            } catch (e) {
                /* empty */
            }

            switch (response.status) {
                case 404:
                    throw new NotFoundError(serverMessage);
                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                    throw new ServerError(response.status, serverMessage, response);
                default:
                    throw new HttpError(response.status, serverMessage);
            }
        }

        return (await response.json()) as Res;
    } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
            throw new TimeoutError();
        }

        if (
            err instanceof FetchError ||
            err instanceof HttpError ||
            err instanceof TimeoutError ||
            err instanceof NotFoundError ||
            err instanceof ServerError
        ) {
            console.log('err', err);
            throw err;
        }

        throw new Error('An unknown error occurred.');
    } finally {
        clearTimeout(id);
    }
}
