import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../app/authSlice.js';

export const store = configureStore({
    reducer: {
        // nameOfSlice : reducer
        auth: authReducer
    }
});

// NOTE: ONLY one store is possible per application

