import * as got from 'got-cjs-compat';
import { RequestOpts, get, post } from './client';
import { Connection } from './Connection';
import { RequestError, UnauthorizedError } from './errors';

export { RequestOpts };

const maxResponseBodyLength = 4096;
const addResponseBodyToErrorMessage = (message: string, body: unknown): string => {
    if (typeof body === 'string') {
        return message + ': ' + body.slice(0, maxResponseBodyLength);
    } else if (Buffer.isBuffer(body)) {
        return message + ': ' + body.toString('utf8', 0, maxResponseBodyLength);
    } else {
        return message;
    }
};

/**
 * Abstract class describing a HTTP request.
 */
export abstract class DeviceRequest {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection description to the device.
     */
    protected constructor(
        /**
         * Gets the connection description to the device.
         */
        protected readonly connection: Connection
    ) {}

    /**
     * Sends a HTTP GET request to a device.
     * @param relativePath The relative path.
     */
    protected async get(relativePath: string, opts?: RequestOpts): Promise<Buffer> {
        try {
            const res = await get(this.connection, relativePath, opts);
            return res.body;
        } catch (error) {
            if (error instanceof got.HTTPError && error.response.statusCode === 401) {
                throw new UnauthorizedError();
            }
            if (error instanceof got.RequestError) {
                error.response?.body
                throw new RequestError(
                    error,
                    addResponseBodyToErrorMessage(error.message, error.response?.body),
                    error.code,
                );
            }

            // Fallback
            throw error;
        }
    }

    /**
     * Sends a HTTP POST request to a device.
     * @param relativePath The relative path.
     * @param body The request body. Plain objects are submitted as JSON.
     */
    protected async post(
        relativePath: string,
        body: string | object | Buffer | FormData,
        opts?: RequestOpts,
    ): Promise<Buffer> {
        try {
            const res = await post(this.connection, relativePath, body, opts);
            return res.body;
        } catch (error) {
            if (error instanceof got.HTTPError && error.response.statusCode === 401) {
                throw new UnauthorizedError();
            }
            if (error instanceof got.RequestError) {
                throw new RequestError(
                    error,
                    addResponseBodyToErrorMessage(error.message, error.response?.body),
                    error.code,
                );
            }

            // Fallback
            throw error;
        }
    }
}
