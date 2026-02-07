
const STATUS = {
    CREATED : 201,
    OK : 200,
    UNPROCESSABLE_ENTITY : 422,
    INTERNAL_SERVER_ERROR : 500,
    UNAUTHORISED : 401,
    FORBIDDEN : 403,
    BAD_REQUEST : 400,
    NOT_FOUND : 404
}

const USER_ROLE = {
    user : 'USER',
    admin : 'ADMIN'
}

module.exports = {
    STATUS,
    USER_ROLE
}