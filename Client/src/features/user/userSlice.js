import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (_, thunkAPI) => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token || '';
    // Fixed endpoint to match backend route
    const res = await axios.get('/service/user/user-infor', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { info: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.info = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;