import {createSlice} from '@reduxjs/toolkit';

const initalState = {
  refreshToken: undefined,
  accessToken: undefined,
  error: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initalState,
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
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;
