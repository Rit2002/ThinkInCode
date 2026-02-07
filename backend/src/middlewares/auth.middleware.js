const { errorResponseBody } = require('../utils/responsebody');
const { STATUS } = require('../utils/contants');

const validateUserRequestBody = (req, res, next) => {
     // validating name
    if(!req.body.firstName){
        errorResponseBody.err = 'Name NOT found in a request object';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validating email
    if(!req.body.email){
        errorResponseBody.err = 'Email NOT found in a request object';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    
    // validating password
    if(!req.body.password){
        errorResponseBody.err = 'Password NOT found in a request object';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateUserRequestBody
}
