import axios, {AxiosResponse} from 'axios';
import {
  GET_SONG_RECOMMENDATION_FAILURE,
  GET_SONG_RECOMMENDATION_REQUEST,
  GET_SONG_RECOMMENDATION_SUCCESS,
  GET_USERS_PLAYLIST_FAILURE,
  GET_USERS_PLAYLIST_REQUEST,
  GET_USERS_PLAYLIST_SUCCESS,
  GET_USERS_TOP_ARTISTS_FAILURE,
  GET_USERS_TOP_ARTISTS_REQUEST,
  GET_USERS_TOP_ARTISTS_SUCCESS,
  PLAY_CONTEXT_FAILURE,
  PLAY_CONTEXT_REQUEST,
  PLAY_CONTEXT_SUCCESS,
  SET_ACCESS_TOKEN,
  SET_EXPIRES_IN,
  GET_ME_REQUEST,
  GET_ME_FAILURE,
  GET_ME_SUCCESS,
  SET_LOGIN,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PAUSE_CONTEXT_REQUEST,
  PAUSE_CONTEXT_SUCCESS,
  PAUSE_CONTEXT_FAILURE,
  SET_LOGOUT,
  SEARCH_ARTIST_REQUEST,
  SEARCH_ARTIST_SUCCESS,
  SEARCH_ARTIST_FAILURE,
  SEARCH_NEXT_ARTIST_REQUEST,
  SEARCH_NEXT_ARTIST_SUCCESS,
  SEARCH_NEXT_ARTIST_FAILURE,
  SET_ARTIST_RESULT,
  SEARCH_NEXT_TRACK_SUCCESS,
  SEARCH_NEXT_TRACK_REQUEST,
  SEARCH_NEXT_TRACK_FAILURE,
  SEARCH_TRACK_FAILURE,
  SEARCH_TRACK_SUCCESS,
  SEARCH_TRACK_REQUEST,
  GET_USERS_TOP_TRACKS_REQUEST,
  GET_USERS_TOP_TRACKS_SUCCESS,
  GET_USERS_TOP_TRACKS_FAILURE,
  SET_TRACK_RESULT,
  GET_GENRE_REQUEST,
  GET_GENRE_SUCCESS,
  GET_GENRE_FAILURE,
  SET_GENRE,
  SET_VALENCE,
  SET_INTSRUMENTALNESS,
  SET_ENERGY,
  SET_SELECTION,
  CREATE_PLAYLIST_REQUEST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAILURE,
  ADD_ITEM_TO_PLAYLIST_REQUEST,
  ADD_ITEM_TO_PLAYLIST_FAILURE,
  ADD_ITEM_TO_PLAYLIST_SUCCESS,
  GET_PLAYLIST_REQUEST,
  GET_PLAYLIST_FAILURE,
  GET_PLAYLIST_SUCCESS,
} from '../types';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {spotifyConfig} from '../../utils/spotifyConfig';
import {getSongRecommendationType} from './userActionsTypes';
import {
  createAddItemToPlaylistTypes,
  createPlaylistTypes,
  getPlaylistAPITypes,
  playContextTypes,
} from '../../utils/types';
import {Dispatch} from 'redux';
import {PayloadAction} from '@reduxjs/toolkit';

export const getSongRecommendationRequest = () => ({
  type: GET_SONG_RECOMMENDATION_REQUEST,
});
export const getSongRecommendationSuccess = (payload: PayloadAction[]) => ({
  type: GET_SONG_RECOMMENDATION_SUCCESS,
  payload,
});
export const getSongRecommendationFailure = (error: string) => ({
  type: GET_SONG_RECOMMENDATION_FAILURE,
  error,
});

export const getUsersPlaylistsRequest = () => ({
  type: GET_USERS_PLAYLIST_REQUEST,
});
export const getUsersPlaylistsSuccess = (payload: PayloadAction[]) => ({
  type: GET_USERS_PLAYLIST_SUCCESS,
  payload,
});
export const getUsersPlaylistsFailure = (error: string) => ({
  type: GET_USERS_PLAYLIST_FAILURE,
  error,
});

export const getMeRequest = () => ({
  type: GET_ME_REQUEST,
});

export const getMeSuccess = (payload: PayloadAction[]) => ({
  type: GET_ME_SUCCESS,
  payload,
});

export const getMeFailure = (error: string) => ({
  type: GET_ME_FAILURE,
  error,
});

export const searchArtistsRequest = () => ({
  type: SEARCH_ARTIST_REQUEST,
});

export const searchArtistsSuccess = (artists: object) => ({
  type: SEARCH_ARTIST_SUCCESS,
  payload: artists,
});

export const searchArtistsFailure = (error: string) => ({
  type: SEARCH_ARTIST_FAILURE,
  error,
});

export const searchNextArtistsRequest = () => ({
  type: SEARCH_NEXT_ARTIST_REQUEST,
});

export const searchNextArtistsSuccess = (newArtists: object[]) => ({
  type: SEARCH_NEXT_ARTIST_SUCCESS,
  payload: newArtists,
});

export const searchNextArtistsFailure = (error: string) => ({
  type: SEARCH_NEXT_ARTIST_FAILURE,
  error,
});

export const searchTracksRequest = () => ({
  type: SEARCH_TRACK_REQUEST,
});

export const searchTracksSuccess = (trackData: object) => ({
  type: SEARCH_TRACK_SUCCESS,
  payload: trackData,
});

export const searchTracksFailure = (error: string) => ({
  type: SEARCH_TRACK_FAILURE,
  error,
});

export const searchNextTracksRequest = () => ({
  type: SEARCH_NEXT_TRACK_REQUEST,
});

export const searchNextTracksSuccess = (newTracks: object[]) => ({
  type: SEARCH_NEXT_TRACK_SUCCESS,
  payload: newTracks,
});

export const searchNextTracksFailure = (error: string) => ({
  type: SEARCH_NEXT_TRACK_FAILURE,
  error,
});

export const getGenresRequest = () => ({
  type: GET_GENRE_REQUEST,
});

export const getGenresSuccess = (newGenres: string[]) => ({
  type: GET_GENRE_SUCCESS,
  payload: newGenres,
});

export const getGenresFailure = (error: string) => ({
  type: GET_GENRE_FAILURE,
  error,
});

export const getUsersTopArtistsRequest = () => ({
  type: GET_USERS_TOP_ARTISTS_REQUEST,
});
export const getUsersTopArtistsSuccess = (payload: PayloadAction[]) => ({
  type: GET_USERS_TOP_ARTISTS_SUCCESS,
  payload,
});
export const getUsersTopArtistsFailure = (error: string) => ({
  type: GET_USERS_TOP_ARTISTS_FAILURE,
  error,
});

export const getUsersTopTracksRequest = () => ({
  type: GET_USERS_TOP_TRACKS_REQUEST,
});
export const getUsersTopTracksSuccess = (payload: PayloadAction[]) => ({
  type: GET_USERS_TOP_TRACKS_SUCCESS,
  payload,
});
export const getUsersTopTracksFailure = (error: string) => ({
  type: GET_USERS_TOP_TRACKS_FAILURE,
  error,
});

export const playContextRequest = () => ({type: PLAY_CONTEXT_REQUEST});
export const playContextSuccess = (payload: PayloadAction[]) => ({
  type: PLAY_CONTEXT_SUCCESS,
  payload,
});
export const playContextFailure = (error: string) => ({
  type: PLAY_CONTEXT_FAILURE,
  error,
});

export const pauseContextRequest = () => ({type: PAUSE_CONTEXT_REQUEST});
export const pauseContextSuccess = (payload: PayloadAction[]) => ({
  type: PAUSE_CONTEXT_SUCCESS,
  payload,
});
export const pauseContextFailure = (error: string) => ({
  type: PAUSE_CONTEXT_FAILURE,
  error,
});

export const createPlaylistRequest = () => ({
  type: CREATE_PLAYLIST_REQUEST,
});

export const createPlaylistSuccess = (payload: PayloadAction[]) => ({
  type: CREATE_PLAYLIST_SUCCESS,
  payload,
});

export const createPlaylistFailure = (error: string) => ({
  type: CREATE_PLAYLIST_FAILURE,
  error,
});

export const createAddItemToPlaylistRequest = () => ({
  type: ADD_ITEM_TO_PLAYLIST_REQUEST,
});

export const createAddItemToPlaylistSuccess = (payload: PayloadAction[]) => ({
  type: ADD_ITEM_TO_PLAYLIST_SUCCESS,
  payload,
});

export const createAddItemToPlaylistFailure = (error: string) => ({
  type: ADD_ITEM_TO_PLAYLIST_FAILURE,
  error,
});

export const getPlaylistRequest = () => ({
  type: GET_PLAYLIST_REQUEST,
});

export const getPlaylistSuccess = (playlist: string) => ({
  type: GET_PLAYLIST_SUCCESS,
  payload: playlist,
});

export const getPlaylistFailure = (error: string) => ({
  type: GET_PLAYLIST_FAILURE,
  error,
});

export const getPlaylist = ({accessToken, playlistID}: getPlaylistAPITypes) => {
  return async (dispatch: Dispatch) => {
    dispatch(getPlaylistRequest());
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      dispatch(getPlaylistSuccess(response.data));
    } catch (error: any) {
      dispatch(getPlaylistFailure);
    }
  };
};

export const getGenres = (accessToken: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getGenresRequest());
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/recommendations/available-genre-seeds',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      dispatch(getGenresSuccess(response.data));
    } catch (error: any) {
      dispatch(getGenresFailure(error));
    }
  };
};

export const createPlaylist = ({
  accessToken,
  userID,
  playlistName,
}: createPlaylistTypes) => {
  return async (dispatch: Dispatch) => {
    dispatch(createPlaylistRequest());
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        {
          name: playlistName,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await response.data;
      dispatch(createPlaylistSuccess(result));
    } catch (error: any) {
      dispatch(createPlaylistFailure(error));
    }
  };
};

export const createAddItemToPlaylist = ({
  accessToken,
  uris,
  playlistID,
}: createAddItemToPlaylistTypes) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAddItemToPlaylistRequest());
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${uris}`,
        {
          uris: uris,
          position: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await response.data;
      dispatch(createPlaylistSuccess(result));
    } catch (error: any) {
      dispatch(createAddItemToPlaylistFailure(error));
    }
  };
};

export const getSongRecommendation = ({
  accessToken,
  artist,
  track,
  energy,
  mood,
  instrumentalness,
  select,
}: getSongRecommendationType) => {
  let requestURL: string;

  return async (dispatch: Dispatch) => {
    dispatch(getSongRecommendationRequest());

    if (select === 'tracks') {
      requestURL = `https://api.spotify.com/v1/recommendations?seed_tracks=${track}&target_energy=${energy}&target_instrumentalness=${instrumentalness}&target_valence=${mood}`;
    } else if (select === 'artists') {
      requestURL = `https://api.spotify.com/v1/recommendations?seed_artists=${artist}&target_energy=${energy}&target_instrumentalness=${instrumentalness}&target_valence=${mood}`;
    }
    try {
      const response = await axios.get(requestURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getSongRecommendationSuccess(response.data));
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        console.log('Response Data:', error.message);
        console.log('Response Status:', error.response.status);
      }
      dispatch(getSongRecommendationFailure(error.message));
    }
  };
};

// export const searchNextArtists = (accessToken, endpoint) => {
//   return async (dispatch : Dispatch) => {
//     dispatch(searchNextArtistsRequest());
//     try {
//       const response = await axios.get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const result = await response.data;
//       dispatch(searchNextArtistsSuccess(result));
//     } catch (error : any) {
//       console.log(error);
//       dispatch(searchNextArtistsFailure(error.message));
//     }
//   };
// };

export const searchArtists = (
  artistData: string | number,
  accessToken: string,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(searchArtistsRequest());
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${artistData}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const result = response.data;
      dispatch(searchArtistsSuccess(result));
    } catch (error: any) {
      console.log(error);
      dispatch(searchArtistsFailure(error.message));
    }
  };
};

export const searchTrack = (
  trackData: string | number,
  accessToken: string,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(searchTracksRequest());
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${trackData}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const result = response.data;
      dispatch(searchTracksSuccess(result));
    } catch (error: any) {
      console.log(error);
      dispatch(searchTracksFailure(error.message));
    }
  };
};

export const getMe = (accessToken: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getMeRequest());
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getMeSuccess(response.data));
    } catch (error: any) {
      console.log(error);
      console.log('hata baba');
      dispatch(getMeFailure(error.message));
    }
  };
};

export const onLogin = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: LOGIN_REQUEST});
      const session = await authorize(spotifyConfig);
      const accessToken = session.accessToken;
      const expiresIn = session.accessTokenExpirationDate;
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('expiresIn', expiresIn);
      dispatch({type: LOGIN_SUCCESS, payload: {accessToken, expiresIn}});
    } catch (error: any) {
      console.log(error);
      dispatch({type: LOGIN_FAILURE, error: error.message});
    }
  };
};

export const getUsersPlaylists = (accessToken: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getUsersPlaylistsRequest());
      const res = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getUsersPlaylistsSuccess(res.data));
    } catch (error: any) {
      console.log(error);
      dispatch(getUsersPlaylistsFailure(error.message));
    }
  };
};

export const getUsersTopArtists = (accessToken: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getUsersTopArtistsRequest());
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
      dispatch(getUsersTopArtistsSuccess(res.data));
    } catch (error: any) {
      console.log(error);
      dispatch(getUsersTopArtistsFailure(error.message));
    }
  };
};

export const getUsersTopTracks = (accessToken: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getUsersTopTracksRequest());
      const res = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks?limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      dispatch(getUsersTopTracksSuccess(res.data));
    } catch (error: any) {
      console.log(error);
      dispatch(getUsersTopTracksFailure(error.message));
    }
  };
};

export const playContext = (
  accessToken: playContextTypes,
  uri: playContextTypes,
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(playContextRequest());
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
      const result = await response.data;
      dispatch(playContextSuccess(result));
    } catch (error: any) {
      console.log(error);
      dispatch(playContextFailure(error.message));
    }
  };
};

export const pauseContext = (accessToken: string, uri: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(playContextRequest());
      const response = await axios.put(
        'https://api.spotify.com/v1/me/player/pause',
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
      const result = await response.data;
      dispatch(playContextSuccess(result));
    } catch (error: any) {
      console.log(error);
      dispatch(playContextFailure(error.message));
    }
  };
};

export const setAccessToken = (accessToken: string, expiresIn: string) => ({
  type: SET_ACCESS_TOKEN,
  payload: accessToken,
});

export const setExpiresIn = (expiresIn: string) => ({
  type: SET_EXPIRES_IN,
  payload: expiresIn,
});

export const setArtistResult = (IDs: object[]) => ({
  type: SET_ARTIST_RESULT,
  payload: IDs,
});

export const setTracksResult = (IDs: object[]) => ({
  type: SET_TRACK_RESULT,
  payload: IDs,
});

export const setSelectedGenre = (genres: string[]) => ({
  type: SET_GENRE,
  payload: genres,
});

export const setValence = (mood: number) => ({
  type: SET_VALENCE,
  payload: mood,
});

export const setInstrumentalness = (value: number) => ({
  type: SET_INTSRUMENTALNESS,
  payload: value,
});

export const setEnergy = (energy: number) => ({
  type: SET_ENERGY,
  payload: energy,
});

export const setSelection = (selection: string) => ({
  type: SET_SELECTION,
  payload: selection,
});

export const setLogin = (accessToken: string, expiresIn: string) => ({
  type: SET_LOGIN,
  payload: {
    accessToken,
    expiresIn,
  },
});

export const setLogout = () => ({
  type: SET_LOGOUT,
});
