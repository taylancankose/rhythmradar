import {configureStore} from '@reduxjs/toolkit';
import authSlicer from './authSlicer';
import userSlicer from './userSlicer';

export const store = configureStore({
  reducer: {
    authSlicer: authSlicer,
    userSlicer: userSlicer,
  },
});
