import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get('http://localhost:3000/profiles/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default profileSlice.reducer;
