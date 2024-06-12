import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkInfo = createAsyncThunk('workInfo/fetchWorkInfo', async (id, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(`/workInfos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const workInfoSlice = createSlice({
    name: 'workInfo',
    initialState: {
        workInfo: null,
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWorkInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.workInfo = action.payload;
            })
            .addCase(fetchWorkInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default workInfoSlice.reducer;
