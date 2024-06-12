import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// Import other reducers if needed

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // Add other reducers here
    },
    devTools: process.env.NODE_ENV !== 'production',
});
