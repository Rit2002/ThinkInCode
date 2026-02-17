const axios = require('axios');

const getLanguageById = async (lang) => {

    const language = {
        'c++' :  105,
        'javascript' : 102,
        'java' : 91
    }

    return language[lang.toLowerCase()];
}

const submitBatch = async ({source_code, language_Id, stdin, expected_output}) => {
    try {
        const response = await axios.post(
            "http://localhost:2358/submissions?base64_encoded=false&wait=true",
            {
                source_code: source_code,
                language_id: language_Id,
                stdin: stdin,
                expected_output: expected_output
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("Error submitting code:", error.response?.data || error.message);
    }
};

module.exports = {
    getLanguageById,
    submitBatch
}