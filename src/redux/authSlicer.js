import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    accessToken: null,
    refreshToken: null,
    me: null,
    error: false,
    loading: true,
  },
  reducers: {
    setLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setLogout: (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;
