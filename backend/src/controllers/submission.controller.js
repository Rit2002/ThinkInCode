const submissionService = require('../services/submission.service');
const { STATUS } = require('../utils/contants');
const AppError = require('../utils/errorbody');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const submit = async(req, res) => {
    try {
        const response = await submissionService.submitCode(req.params.id, req.body, req.user);

        return res.status(STATUS.OK).json(
            successResponseBody(response, 'Successfully submitted the code')
        );

    } catch (error) {
        
        if(error instanceof AppError) {
            return res.status(error.statusCode).json(
                errorResponseBody(error.message)
            );
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponseBody(error)
        );
    }
}

module.exports = {
    submit,
}