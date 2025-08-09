/**
 * Error thrown when trying to add a user that already exists.
 */
export class UserAlreadyExistsError extends Error {
    constructor(message = 'User already exists') {
        super(message);
        Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
    }
}
