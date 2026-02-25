const User = require('../models/user.model');
const { STATUS } = require('../utils/contants');
const AppError = require('../utils/errorbody');
const { redisClient } = require('../config/redis.config');
const jwt = require('jsonwebtoken');

const registerUser = async (data) => {
    try {

        const exists = await User.findOne({ email: data.email });
        
        if(exists) {
            throw new AppError(
                STATUS.CONFLICT,
                'user already exists'
            );
        }

        const user = await User.create(data);
        return user;

    } catch (error) {
        console.log(error);
        
        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw new AppError (
                STATUS.UNPROCESSABLE_ENTITY,                
                err
            )
        }

        if(error instanceof AppError) {
            throw new AppError(
                error.statusCode,
                error.details
            );
        }
        
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email : email});

        if(!user) {
            throw new AppError(
                STATUS.UNAUTHORISED,
                'User NOT found for given email'
            )
        }

        return user;

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

const logout = async (token) => {
    try {
        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`, 'Blocked');
        await redisClient.expireAt(`token:${token}`, payload.exp);

        return 'Successfully logged out';

    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    getUserByEmail,
    logout
}