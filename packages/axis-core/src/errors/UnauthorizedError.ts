/**
 * Error thrown when user is unauthorized to perform a certain operation.
 */
export class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
