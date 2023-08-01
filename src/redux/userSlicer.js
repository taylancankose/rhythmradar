import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {setLogin} from './authSlicer';
import axios from 'axios';

const initalState = {
  me: undefined,
};

export const getMe = createAsyncThunk('meUser', async accessToken => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${
          accessToken.includes(`"`)
            ? accessToken.substring(1, accessToken?.length - 1)
            : accessToken
        }`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return await response.data;
  } catch (error) {
    console.log(error, 'hataaaa');
  }
});

const userSlicer = createSlice({
  name: 'userSlicer',
  initialState: initalState,
  reducers: {
    setMe: (state, action) => {
      state.me = action.payload;
    },
  },
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      state.me = action.payload;
    },
    [getMe.rejected]: (state, action) => {
      const data = {
        accessToken: undefined,
        refreshToken: undefined,
        error: true,
      };
    },
  },
});

export default userSlicer.reducer;
