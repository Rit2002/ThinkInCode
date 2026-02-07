const User = require('../models/user.model');
const { STATUS } = require('../utils/contants');

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

            throw {
                err : err,
                code : STATUS.UNPROCESSABLE_ENTITY                
            }
        }
        
        throw error;
    }
}

module.exports = {
    registerUser
}