import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/tic/api/v1',
    // automatically adds the token with the request
    credentials: true,
    headers: {
        "Content-Type" : "application/json"
    }
});

/**
 *  AXIOS SUCCESS RESPONSE
 * {
        data: { // response body from backend
                success: true,
                data: { id: "u123", name: "Ritesh" },
                err: null,
                message: "User fetched"
            },      
        status: 200,        // HTTP status code
        statusText: "OK",   // status message
        headers: {...},     // response headers
        config: {...},      // request config you sent
        request: {...}      // underlying request object
    }
 */

/**
 * AXIOS ERROR RESPONSE
 * {
        message: "Request failed with status code 401",
        name: "AxiosError",

        response: {
            data: {               // ← your backend error response
            success: false,
            err: "Invalid credentials",
            data: null,
            message: "Login failed"
            },
            status: 401,
            headers: {...}
        },

        config: {...},
        request: {...}
    }
 */


export default axiosClient;