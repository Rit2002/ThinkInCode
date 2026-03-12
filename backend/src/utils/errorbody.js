class AppError extends Error {
    constructor( statusCode, details, message='something went wrong') {

        super(message);

        this.statusCode = statusCode;
        this.details = details

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;