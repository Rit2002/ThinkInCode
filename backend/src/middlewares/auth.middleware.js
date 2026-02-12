const { errorResponseBody } = require('../utils/responsebody');
const { STATUS } = require('../utils/contants');
const { redisClient } = require('../config/redis.config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

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

const validateUserToken = async (req, res, next) => {
    try {
        // Extractin token from cookies
        const { token } = req.cookies;
        
        // checking if token exist or not
        if(!token) {
            return res.status(STATUS.NOT_FOUND).json(
                errorResponseBody('No Token found')
            );
        }

        // verifying if the token is valid or not
        const payload = jwt.verify(token, process.env.AUTH_KEY);

        // extracting id from payload
        const { id } = payload;

        // checking if id is present or not 
        if(!id) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid token')
            );
        }

        // querying the user corresponding to id
        const user = await User.findById(id);

        // returning if no user is found
        if(!user) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid token')
            );
        }

        // checking if the token is already blocked or not
        const isBlocked = await redisClient.exists(`token:${token}`);

        // if Blocked return
        if(isBlocked) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid token')
            );
        }

        // If everything is okay
        req.user = user;

        next();

    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    validateUserRequestBody,
    validateUserSigninRequest,
    validateUserToken
}
