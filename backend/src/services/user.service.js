const User = require('../models/user.model');
const { STATUS } = require('../utils/contants');
const AppError = require('../utils/errorbody');

const registerUser = async (data) => {
    try {
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
                err,
                STATUS.UNPROCESSABLE_ENTITY                
            )
        }
        
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email : email});

        if(!user) {
            throw new AppError(
                'User NOT found for given email',
                STATUS.UNAUTHORISED
            )
        }

        return user;

    } catch (error) {
        console.log(error);

        throw error;        
    }
}

module.exports = {
    registerUser,
    getUserByEmail
}