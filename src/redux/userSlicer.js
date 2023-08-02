import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getSongRecom = createAsyncThunk('song', async accessToken => {
  try {
    const res = await fetch(
      'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA',
      {
        headers: {
          Authorization: `Bearer ${
            accessToken.includes(`"`)
              ? accessToken.substring(1, accessToken?.length - 1)
              : accessToken
          }`,
        },
      },
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error, 'get error');
  }
});

const userSlicer = createSlice({
  name: 'userSlicer',
  initialState: {
    recSong: undefined,
  },
  extraReducers: {
    [getSongRecom.fulfilled]: (state, action) => {
      state.recSong = action.payload;
    },
    [getSongRecom.rejected]: (state, action) => {
      state.recSong = undefined;
    },
  },
});

export default userSlicer.reducer;
