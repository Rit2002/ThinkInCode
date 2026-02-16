const Problem = require('../models/problem.model');
const { STATUS } = require('../utils/contants');
const AppError = require('../utils/errorbody');

const createProblem = async (data) => {
    try {
        const problem = await Problem.create(data);

        return problem;

    } catch (error) {
        console.log(error);

        if(error.name == 'ValidationError') {
            let err = {};

            Object.keys(error.errors).forEach( key => {
                err[key] = error.errors[key].message;
            });

            throw new AppError(
                STATUS.UNPROCESSABLE_ENTITY,
                err
            );
        }
        
        throw err;
    }
}

module.exports = {
    createProblem
}