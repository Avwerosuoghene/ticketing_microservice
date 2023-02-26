import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = "Error connecting to database";
    statusCode = 500;
    constructor() {

        // The message is passed for logging purposes only
        super('Error connecting to database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ]
    }
}