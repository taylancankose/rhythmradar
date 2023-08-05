import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

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

export const getUsersPlaylists = createAsyncThunk(
  'playlists',
  async accessToken => {
    try {
      const res = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${
            accessToken.includes(`"`)
              ? accessToken.substring(1, accessToken?.length - 1)
              : accessToken
          }`,
        },
      });
      const response = await res.data;
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getUsersTopArtists = createAsyncThunk(
  'artists',
  async accessToken => {
    try {
      const res = await axios.get(
        'https://api.spotify.com/v1/me/top/artists?limit=10',
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
      const response = await res.data;
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const playContext = createAsyncThunk(
  'play',
  async (accessToken, uri) => {
    const response = await axios.put(
      'https://api.spotify.com/v1/me/player/play',
      {
        context_uri: uri,
        offset: {
          position: 5,
        },
        position_ms: 0,
      },
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
    try {
      const result = await response.data;
      return result;
    } catch (error) {
      console.log(error);
    }
  },
);

const userSlicer = createSlice({
  name: 'userSlicer',
  initialState: {
    recSong: undefined,
    loading: false,
    playlist: undefined,
    error: false,
    topArtists: undefined,
    play: undefined,
  },
  extraReducers: {
    [getSongRecom.fulfilled]: (state, action) => {
      state.recSong = action.payload;
      state.loading = false;
      state.error = false;
    },
    [getSongRecom.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getSongRecom.rejected]: (state, action) => {
      state.recSong = undefined;
      state.error = action.error;
      state.loading = false;
    },
    [getUsersPlaylists.fulfilled]: (state, action) => {
      state.playlist = action.payload;
      state.loading = false;
      state.error = false;
    },
    [getUsersPlaylists.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getUsersPlaylists.rejected]: (state, action) => {
      state.playlist = undefined;
      state.error = action.error;
      state.loading = false;
    },
    [getUsersTopArtists.fulfilled]: (state, action) => {
      state.topArtists = action.payload;
      state.loading = false;
      state.error = false;
    },
    [getUsersTopArtists.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [getUsersTopArtists.rejected]: (state, action) => {
      state.topArtists = undefined;
      state.error = action.error;
      state.loading = false;
    },
    [playContext.fulfilled]: (state, action) => {
      state.play.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    [playContext.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [playContext.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export default userSlicer.reducer;
