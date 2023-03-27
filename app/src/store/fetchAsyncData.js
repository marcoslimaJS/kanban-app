import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/register/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export default fetchUserData;
