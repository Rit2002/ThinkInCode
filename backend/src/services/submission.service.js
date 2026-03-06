const Problem = require("../models/problem.model");
const Submission = require('../models/submission.model');
const { LANGUAGE, STATUS } = require("../utils/contants");
const AppError = require("../utils/errorbody");
const { submitBatch, submitTokens } = require("../utils/problem");

const submitCode = async (problemId, data, user) => {
    try {
        const userId = user._id;

        const problem = await Problem.findById(problemId);

        if(!problem) {
            throw new AppError(
                STATUS.NOT_FOUND,
                null,
                "Problem NOT found for given id"
            );
        }

        const {code, language} = data;

        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            totalTestCases: problem.hiddenTestCases.length
        });

        const languageId = LANGUAGE[language.toLowerCase()];
        

        const submissions = problem.hiddenTestCases.map( testcase => ({
            source_code : code,
            language_id : languageId,
            stdin : testcase.input,
            expected_output : testcase.output
        }));

        
        

        // send the code to judge0
        const submitResult = await submitBatch(submissions);
        

        const resultTokens = submitResult.map( r => r.token);
        
        
        // send the token & get the result
        const testResult = await submitTokens(resultTokens);

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = 'Accepted';
        let errorMessage = null;

        for (const test of testResult) {
            const id = test.status.id;

            if (id === 3) {
                testCasesPassed++;
                runtime += Number(test.time);
                memory = Math.max(memory, Number(test.memory));
            } else {
                if (id === 4) {
                    status = "Error";
                    errorMessage = test.stderr;
                } else {
                    status = "Wrong";
                }
                break;
            }
        }

        submittedResult.status = status;
        submittedResult.errorMessage = errorMessage;
        submittedResult.runTime = runtime;
        submittedResult.memory = memory;

        await submittedResult.save();

        return submittedResult;
        
    } catch (error) {
        console.log(error);

        throw error;        
    }
}

module.exports = {
    submitCode
}