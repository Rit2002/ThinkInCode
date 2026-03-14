import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../utils/axios.util.js';

/**
 * createAsyncThunk is Redux Toolkit’s way to handle async operations like:
 * 
    API calls
    database requests
    authentication
    fetching data
*/
export const registerUser = createAsyncThunk(
    'auth/register',
    // userData -- > contains form data submitted by user
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(
                '/auth/register',
                userData
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(
                '/auth/signin',
                userData
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/check',
    async(_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(
                '/auth/check'
            );

            return response.data;
        } catch (error) {
            
           return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/signout',
    async(_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(
                '/auth/signout'
            );

            return response.data;
        } catch (error) {
            
           return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

/**
 *  SUCCESS 
 * action : {
        success: true,
        data: {
            id: "u123",
            name: "Ritesh",
            email: "ritesh@gmail.com"
        },
        err: null,
        message: "Login successful"
    }
 */

/**
 *  ERROR 
 * action : {
        type: "auth/login/rejected",
        payload: {
            success: false,
            err: "Invalid credentials",
            data: null,
            message: "Login failed"
        }
    }
 */

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        // reducers → handle slice actions
    },
   
    // extraReducers → handle external actions( API calls )
    extraReducers: (builder) => {
        // builder is just an object Redux Toolkit gives you to register reducers for different actions.
        builder
            // addCase connects an action type to a reducer function.EX: addCase(actionType, reducerFunction)
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                // !!action.payload -->if action.payload == null than false or if action.payload == object than true
                state.isAuthenticated = !!action.payload.data
                state.user = action.payload.data;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false
                state.error = action.payload?.err || 'something went wrong';
                state.user = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = !!action.payload.data
                state.user = action.payload.data;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false
                state.error = action.payload?.err || 'something went wrong';
                state.user = null;
            })
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = !!action.payload.data
                state.user = action.payload.data;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false
                state.error = action.payload?.err || 'something went wrong';
                state.user = null;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = !!action.payload.data
                state.user = action.payload.data;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false
                state.error = action.payload?.err || 'something went wrong';
                state.user = null;
            })
    }
});



export default authSlice.reducer;