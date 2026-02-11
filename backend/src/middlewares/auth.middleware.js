const { errorResponseBody } = require('../utils/responsebody');
const { STATUS } = require('../utils/contants');

const validateUserRequestBody = (req, res, next) => {
     // validating name
    if(!req.body.firstName){
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Name NOT found in a request object')
        );
    }

    // validating email
    if(!req.body.email){
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Email NOT found in a request object')
        );
    }
    
    // validating password
    if(!req.body.password){
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('Password NOT found in a request object')
        );
    }

    next();
}

const validateUserSigninRequest = (req, res, next) => {

    if(!req.body.email) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No email found in request body')
        );
    }
    
    if(!req.body.password) {
        return res.status(STATUS.BAD_REQUEST).json(
            errorResponseBody('No password found in request body')
        );
    }

    next();
}

module.exports = {
    validateUserRequestBody,
    validateUserSigninRequest
}
