import { FormDataEncoder } from 'form-data-encoder';
import { type OptionsOfBufferResponseBody } from 'got-cjs-compat';
import { Readable } from 'node:stream';
import { Connection } from './Connection';
import { Response } from './Response';
import { clientProvider } from './auth/client-provider';

export type RequestOpts = {
    /**
     * Whether or not the request may be retried. Defaults to `true`.
     */
    retry?: boolean;
    /**
     * A signal that may be used to cancel a request in progress.
     */
    signal?: AbortSignal;
};

/**
 * Send a HTTP GET request to the device.
 * @param connection The connection to the device.
 * @param relativePath The relative path.
 */
export const get = (
    connection: Connection,
    relativePath: string,
    opts?: RequestOpts,
): Promise<Response> => {
    const url = connection.url + format(relativePath);
    const client = clientProvider(
        'GET',
        url,
        connection.username,
        connection.password,
        connection?.options?.agent,
    );

    const getOpts: OptionsOfBufferResponseBody = { responseType: 'buffer' };
    if (!(opts?.retry ?? true)) {
        getOpts.retry = { limit: 0 };
    }
    if (opts?.signal) {
        getOpts.signal = opts.signal;
    }
    return client.get(url, getOpts);
};

/**
 * Send a HTTP POST request to the device.
 * @param connection The connection to the device.
 * @param relativePath The relative path.
 * @param body The request body. Plain objects are submitted as JSON.
 */
export const post = (
    connection: Connection,
    relativePath: string,
    body: string | object | Buffer | FormData | Readable | URLSearchParams,
    opts?: RequestOpts,
): Promise<Response> => {
    const url = connection.url + format(relativePath);
    const client = clientProvider(
        'POST',
        url,
        connection.username,
        connection.password,
        connection?.options?.agent,
    );

    const postOpts: OptionsOfBufferResponseBody = { responseType: 'buffer' };

    if (!(opts?.retry ?? true)) {
        postOpts.retry = { limit: 0 };
    }
    if (opts?.signal) {
        postOpts.signal = opts.signal;
    }

    if (body instanceof URLSearchParams) {
        postOpts.body = body.toString();
        postOpts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    } else if (body instanceof FormData) {
        const encoder = new FormDataEncoder(body);
        postOpts.body = encoder.encode();
        postOpts.headers = encoder.headers;
    } else if (typeof body !== 'object' || body instanceof Buffer || body instanceof Readable) {
        postOpts.body = body;
    } else {
        postOpts.json = body;
    }

    return client.post(url, postOpts);
};

const format = (relativePath: string): string => {
    if (relativePath.startsWith('/')) {
        return relativePath;
    }

    return '/' + relativePath;
};
