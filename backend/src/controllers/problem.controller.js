const problemService = require('../services/problem.service');
const { STATUS } = require('../utils/contants');
const AppError = require('../utils/errorbody');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
    try {
        const response = await problemService.createProblem(req.body, req.user);

        return res.status(STATUS.CREATED).json(
            successResponseBody(response, 'Successfully created the problem')
        );

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json(
                errorResponseBody(error.details)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

const update = async (req, res) => {
    try {
        const response = await problemService.updateProblem(req.params.id, req.body);

        return res.status(STATUS.OK).json(
            successResponseBody(response, 'Successfully updated the problem')
        );

    } catch (error) {
        
        if(error instanceof AppError) {

            return res.status(error.statusCode).json(
                errorResponseBody(error.details)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

module.exports = {
    create,
    update
}