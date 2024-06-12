import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAdditionalInfo = createAsyncThunk('additionalInfo/fetchAdditionalInfo', async (id, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(`/additionalInfos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const additionalInfoSlice = createSlice({
    name: 'additionalInfo',
    initialState: {
        additionalInfo: null,
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdditionalInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAdditionalInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.additionalInfo = action.payload;
            })
            .addCase(fetchAdditionalInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default additionalInfoSlice.reducer;
