const Problem = require('../models/problem.model');
const { STATUS } = require('../utils/contants');
const AppError = require('../utils/errorbody');

const createProblem = async (data) => {
    try {
        const exists = await Problem.findOne({ title: data.title });

        if(exists) {
            throw new AppError(
                STATUS.CONFLICT,
                'The problem you are trying to insert already exists'
            );
        }
        
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

        if(error instanceof AppError) {
            throw new AppError(
                error.statusCode,
                error.details
            );
        }
        
        throw err;
    }
}

module.exports = {
    createProblem
}