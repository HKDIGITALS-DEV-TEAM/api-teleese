/* eslint-disable no-unused-vars */

export class BaseException extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
