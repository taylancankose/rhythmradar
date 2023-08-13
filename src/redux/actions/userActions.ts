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
} from '../types';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {spotifyConfig} from '../../utils/spotifyConfig';
import {getSongRecommendationType} from './userActionsTypes';

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

export const searchArtistsRequest = () => ({
  type: SEARCH_ARTIST_REQUEST,
});

export const searchArtistsSuccess = artistData => ({
  type: SEARCH_ARTIST_SUCCESS,
  payload: artistData,
});

export const searchArtistsFailure = error => ({
  type: SEARCH_ARTIST_FAILURE,
  error,
});

export const searchNextArtistsRequest = () => ({
  type: SEARCH_NEXT_ARTIST_REQUEST,
});

export const searchNextArtistsSuccess = newArtists => ({
  type: SEARCH_NEXT_ARTIST_SUCCESS,
  payload: newArtists,
});

export const searchNextArtistsFailure = error => ({
  type: SEARCH_NEXT_ARTIST_FAILURE,
  error,
});

export const searchTracksRequest = () => ({
  type: SEARCH_TRACK_REQUEST,
});

export const searchTracksSuccess = trackData => ({
  type: SEARCH_TRACK_SUCCESS,
  payload: trackData,
});

export const searchTracksFailure = error => ({
  type: SEARCH_TRACK_FAILURE,
  error,
});

export const searchNextTracksRequest = () => ({
  type: SEARCH_NEXT_TRACK_REQUEST,
});

export const searchNextTracksSuccess = newTracks => ({
  type: SEARCH_NEXT_TRACK_SUCCESS,
  payload: newTracks,
});

export const searchNextTracksFailure = error => ({
  type: SEARCH_NEXT_TRACK_FAILURE,
  error,
});

export const getGenresRequest = () => ({
  type: GET_GENRE_REQUEST,
});

export const getGenresSuccess = newGenres => ({
  type: GET_GENRE_SUCCESS,
  payload: newGenres,
});

export const getGenresFailure = error => ({
  type: GET_GENRE_FAILURE,
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

export const getUsersTopTracksRequest = () => ({
  type: GET_USERS_TOP_TRACKS_REQUEST,
});
export const getUsersTopTracksSuccess = payload => ({
  type: GET_USERS_TOP_TRACKS_SUCCESS,
  payload,
});
export const getUsersTopTracksFailure = error => ({
  type: GET_USERS_TOP_TRACKS_FAILURE,
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

export const getGenres = (accessToken: string) => {
  return async dispatch => {
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
    } catch (error) {
      dispatch(getGenresFailure(error));
    }
  };
};

export const getSongRecommendation = ({
  accessToken,
  artist,
  track,
  genre,
  energy,
  mood,
  instrumentalness,
  select,
}: getSongRecommendationType) => {
  return async dispatch => {
    dispatch(getSongRecommendationRequest());
    let requestURL;

    if (select === 'tracks') {
      requestURL = `https://api.spotify.com/v1/recommendations?seed_tracks=${track}&target_energy=${energy}&target_instrumentalness=${instrumentalness}&target_valence=${mood}`;
    } else if (select === 'artistsGenres') {
      requestURL = `https://api.spotify.com/v1/recommendations?seed_artists=${artist}&seed_genres=${genre}&target_energy=${energy}&target_instrumentalness=${instrumentalness}&target_valence=${mood}`;
    }
    console.error(' se', select);

    try {
      const response = await axios.get(requestURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getSongRecommendationSuccess(response.data));
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log('Response Data:', error.response.data);
        console.log('Response Status:', error.response.status);
        console.log('Response Status Text:', error.response.statusText);
      }
      dispatch(getSongRecommendationFailure(error.message));
    }
  };
};

// export const searchNextArtists = (accessToken, endpoint) => {
//   return async dispatch => {
//     dispatch(searchNextArtistsRequest());
//     try {
//       const response = await axios.get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const result = await response.data;
//       dispatch(searchNextArtistsSuccess(result));
//     } catch (error) {
//       console.log(error);
//       dispatch(searchNextArtistsFailure(error.message));
//     }
//   };
// };

// export const searchArtists = (accessToken, input) => {
//   return async dispatch => {
//     dispatch(searchArtistsRequest());
//     try {
//       const response = await axios.get(
//         `https://api.spotify.com/v1/search?q=${input}&type=artist`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       const result = response.data;
//       dispatch(searchArtistsSuccess(result));
//     } catch (error) {
//       console.log(error);
//       dispatch(searchArtistsFailure(error.message));
//     }
//   };
// };

export const getMe = (accessToken: string) => {
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

export const getUsersPlaylists = (accessToken: string) => {
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

export const getUsersTopArtists = (accessToken: string) => {
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

export const getUsersTopTracks = (accessToken: string) => {
  return async dispatch => {
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
    } catch (error) {
      console.log(error);
      dispatch(getUsersTopTracksFailure(error.message));
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

export const setArtistResult = IDs => ({
  type: SET_ARTIST_RESULT,
  payload: IDs,
});

export const setTracksResult = IDs => ({
  type: SET_TRACK_RESULT,
  payload: IDs,
});

export const setSelectedGenre = genres => ({
  type: SET_GENRE,
  payload: genres,
});

export const setValence = mood => ({
  type: SET_VALENCE,
  payload: mood,
});

export const setInstrumentalness = value => ({
  type: SET_INTSRUMENTALNESS,
  payload: value,
});

export const setEnergy = energy => ({
  type: SET_ENERGY,
  payload: energy,
});

export const setSelection = selection => ({
  type: SET_SELECTION,
  payload: selection,
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
