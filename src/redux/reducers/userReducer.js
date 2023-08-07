import {
  GET_ME_FAILURE,
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_SONG_RECOMMENDATION_FAILURE,
  GET_SONG_RECOMMENDATION_REQUEST,
  GET_SONG_RECOMMENDATION_SUCCESS,
  GET_USERS_PLAYLIST_FAILURE,
  GET_USERS_PLAYLIST_REQUEST,
  GET_USERS_PLAYLIST_SUCCESS,
  GET_USERS_TOP_ARTISTS_FAILURE,
  GET_USERS_TOP_ARTISTS_REQUEST,
  GET_USERS_TOP_ARTISTS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PLAY_CONTEXT_FAILURE,
  PLAY_CONTEXT_REQUEST,
  PLAY_CONTEXT_SUCCESS,
  SET_ACCESS_TOKEN,
  SET_EXPIRES_IN,
  SET_LOGIN,
  SET_LOGOUT,
} from '../types';

const initialState = {
  recSong: undefined,
  loading: false,
  playlist: undefined,
  error: false,
  topArtists: undefined,
  play: undefined,
  accessToken: undefined,
  expiresIn: undefined,
  me: undefined,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONG_RECOMMENDATION_REQUEST:
    case GET_USERS_PLAYLIST_REQUEST:
    case GET_USERS_TOP_ARTISTS_REQUEST:
    case GET_ME_REQUEST:
    case PLAY_CONTEXT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_SONG_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        recSong: action.payload,
        loading: false,
        error: null,
      };
    case GET_USERS_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlist: action.payload,
        loading: false,
        error: false,
      };
    case GET_USERS_TOP_ARTISTS_SUCCESS:
      return {
        ...state,
        topArtists: action.payload,
        loading: false,
        error: false,
      };
    case PLAY_CONTEXT_SUCCESS:
      return {
        ...state,
        play: [...(state.play || []), action.payload],
        loading: false,
        error: false,
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        me: action.payload,
        loading: false,
        error: false,
      };
    case GET_ME_FAILURE:
    case GET_SONG_RECOMMENDATION_FAILURE:
    case GET_USERS_PLAYLIST_FAILURE:
    case GET_USERS_TOP_ARTISTS_FAILURE:
    case PLAY_CONTEXT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case SET_EXPIRES_IN:
      return {
        ...state,
        expiresIn: action.payload,
      };
    case SET_LOGIN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
        error: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        accessToken: null,
        expiresIn: null,
        loading: false,
        error: action.error,
      };
    case SET_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
