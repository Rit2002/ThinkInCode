const userService = require('../services/user.service');
const { STATUS } = require('../utils/contants');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const response = await userService.registerUser(req.body);

        const token = jwt.sign(
            {id : response.id, email : response.email},
            process.env.AUTH_KEY,
            { expiresIn : '4h' }
        );

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully resgistered the user';

        res
        .cookie('token', token, { maxAge : 240*60*1000 })
        .status(STATUS.CREATED)
        .json(successResponseBody);

    } catch (error) {
        
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    register
}