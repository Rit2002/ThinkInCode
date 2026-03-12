const { errorResponseBody } = require('../utils/responsebody');
const { STATUS, USER_ROLE } = require('../utils/contants');
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

const isAuthenticated = async (req, res, next) => {
    try {
        // Extracting token from cookies
        const token = req.cookies?.token;
        
        // checking if token exist or not
        if(!token) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Authentication required')
            );
        }

        // verifying if the token is valid or not
        const payload = jwt.verify(token, process.env.AUTH_KEY);

        // extracting id from payload
        const { id } = payload;

        // checking if id is present or not 
        if(!id) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid Credentials')
            );
        }

        // querying the user corresponding to id
        const user = await User.findById(id);

        // returning if no user is found
        if(!user) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid credentials')
            );
        }

        // checking if the token is already blocked or not
        const isBlocked = await redisClient.exists(`token:${token}`);

        // if Blocked return
        if(isBlocked) {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('Invalid credentials')
            );
        }

     
        // If everything is okay
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        
        if(error.name == 'JsonWebTokenError') {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody(error.message)
            );
        }

        if(error.name == 'TokenExpiredError') {
            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody(error.message)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

const isAdmin = (req, res, next) => {
    try {

        if(req.user.role != USER_ROLE.admin) {

            return res.status(STATUS.UNAUTHORISED).json(
                errorResponseBody('You are NOT Authorised ')
            )
        }

        next();

    } catch (error) {
        
        console.log(error);        
    }
}

const isTokenPresent = (req, res, next) => {

    if(!req.cookie?.token) {
        return res.status(STATUS.UNAUTHORISED).json(
            errorResponseBody("No token present, please signin or signup")
        );
    }

    next();
}

module.exports = {
    validateUserRequestBody,
    validateUserSigninRequest,
    isAuthenticated,
    isAdmin,
    isTokenPresent
}
