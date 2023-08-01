import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMe = createAsyncThunk('me', async accessToken => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res = await response.data;
    return res;
  } catch (error) {
    console.log(error, 'hataaaa');
    accessToken === undefined;
  }
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    refreshToken: undefined,
    accessToken: undefined,
    error: false,
    me: undefined,
  },
  reducers: {
    setLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = false;
    },
    setLogout: (state, action) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      state.me = action.payload;
    },
    [getMe.rejected]: (state, action) => {
      state.accessToken = undefined;
      state.rejected = undefined;
      state.error = action.error.message;
    },
  },
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;
