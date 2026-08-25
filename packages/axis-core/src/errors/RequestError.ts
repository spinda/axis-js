/**
 * Error thrown when a request fails.
 */
export class RequestError extends Error {
    /**
     * Gets the underlying HTTP error.
     */
    declare readonly error: unknown;

    /**
     * Initializes a new instance of the class.
     * @param error The error.
     * @param message The error message.
     * @param code The error code, like `ECONNREFUSED`.
     */
    constructor(
        error: unknown,
        message?: string,
        /**
         * Gets the error code, like `ECONNREFUSED`.
         */
        readonly code?: string,
    ) {
        super(message || 'Axis device request error');

        Object.defineProperty(this, 'error', {
            value: error,
            enumerable: false,
            writable: false,
            configurable: true,
        });
    }
}
