import axios from 'axios';
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
} from '../types';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {spotifyConfig} from '../../utils/spotifyConfig';

export const getSongRecommendationRequest = () => ({
  type: GET_SONG_RECOMMENDATION_REQUEST,
});
export const getSongRecommendationSuccess = payload => ({
  type: GET_SONG_RECOMMENDATION_SUCCESS,
  payload,
});
export const getSongRecommendationFailure = error => ({
  type: GET_SONG_RECOMMENDATION_FAILURE,
  error,
});

export const getUsersPlaylistsRequest = () => ({
  type: GET_USERS_PLAYLIST_REQUEST,
});
export const getUsersPlaylistsSuccess = payload => ({
  type: GET_USERS_PLAYLIST_SUCCESS,
  payload,
});
export const getUsersPlaylistsFailure = error => ({
  type: GET_USERS_PLAYLIST_FAILURE,
  error,
});

export const getMeRequest = () => ({
  type: GET_ME_REQUEST,
});

export const getMeSuccess = payload => ({
  type: GET_ME_SUCCESS,
  payload,
});

export const getMeFailure = error => ({
  type: GET_ME_FAILURE,
  error,
});

export const getUsersTopArtistsRequest = () => ({
  type: GET_USERS_TOP_ARTISTS_REQUEST,
});
export const getUsersTopArtistsSuccess = payload => ({
  type: GET_USERS_TOP_ARTISTS_SUCCESS,
  payload,
});
export const getUsersTopArtistsFailure = error => ({
  type: GET_USERS_TOP_ARTISTS_FAILURE,
  error,
});

export const playContextRequest = () => ({type: PLAY_CONTEXT_REQUEST});
export const playContextSuccess = payload => ({
  type: PLAY_CONTEXT_SUCCESS,
  payload,
});
export const playContextFailure = error => ({
  type: PLAY_CONTEXT_FAILURE,
  error,
});

export const pauseContextRequest = () => ({type: PAUSE_CONTEXT_REQUEST});
export const pauseContextSuccess = payload => ({
  type: PAUSE_CONTEXT_SUCCESS,
  payload,
});
export const pauseContextFailure = error => ({
  type: PAUSE_CONTEXT_FAILURE,
  error,
});

export const getSongRecommendation = accessToken => {
  return async dispatch => {
    dispatch(getSongRecommendationRequest());
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      dispatch(getSongRecommendationSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(getSongRecommendationFailure(error.message));
    }
  };
};

export const getMe = accessToken => {
  return async dispatch => {
    try {
      dispatch(getMeRequest());
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getMeSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(getMeFailure(error.message));
    }
  };
};

export const onLogin = () => {
  return async dispatch => {
    try {
      dispatch({type: LOGIN_REQUEST});
      const session = await authorize(spotifyConfig);
      const accessToken = session.accessToken;
      const expiresIn = session.accessTokenExpirationDate;
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('expiresIn', expiresIn);
      dispatch({type: LOGIN_SUCCESS, payload: {accessToken, expiresIn}});
    } catch (error) {
      console.log(error);
      dispatch({type: LOGIN_FAILURE, error: error.message});
    }
  };
};

export const getUsersPlaylists = accessToken => {
  return async dispatch => {
    try {
      dispatch(getUsersPlaylistsRequest());
      const res = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getUsersPlaylistsSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(getUsersPlaylistsFailure(error.message));
    }
  };
};

export const getUsersTopArtists = accessToken => {
  return async dispatch => {
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
    } catch (error) {
      console.log(error);
      dispatch(getUsersTopArtistsFailure(error.message));
    }
  };
};

export const playContext = (accessToken, uri) => {
  return async dispatch => {
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
    } catch (error) {
      console.log(error);
      dispatch(playContextFailure(error.message));
    }
  };
};

export const pauseContext = (accessToken, uri) => {
  return async dispatch => {
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
    } catch (error) {
      console.log(error);
      dispatch(playContextFailure(error.message));
    }
  };
};

export const setAccessToken = (accessToken, expiresIn) => ({
  type: SET_ACCESS_TOKEN,
  payload: accessToken,
});

export const setExpiresIn = expiresIn => ({
  type: SET_EXPIRES_IN,
  payload: expiresIn,
});

export const setLogin = (accessToken, expiresIn) => ({
  type: SET_LOGIN,
  payload: {
    accessToken,
    expiresIn,
  },
});

export const setLogout = () => ({
  type: SET_LOGOUT,
});
