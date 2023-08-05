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
  }
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: undefined,
    error: false,
    me: undefined,
    expiresIn: undefined,
  },
  reducers: {
    setLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.error = false;
      state.expiresIn = action.payload.expiresIn;
    },
    setLogout: (state, action) => {
      state.accessToken = undefined;
      state.error = false;
      state.expiresIn = undefined;
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
