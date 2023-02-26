
// abstract class can't be instantiated
// The can be used instead if interface
export abstract class CustomError extends Error {
    // This shows that a subcalss of this class must implement this statusCode
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    };

    // We are defining a method signature which must return sonething
    abstract serializeErrors() : {message: string, field? : string}[];
};