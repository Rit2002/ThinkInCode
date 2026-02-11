class AppError extends Error {
    constructor(details=null, statusCode) {

        super(details);

        this.statusCode = statusCode;
        this.details = details

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;