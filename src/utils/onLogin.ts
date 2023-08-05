import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from '../redux/authSlicer';
import {authorize} from 'react-native-app-auth';
import {useDispatch} from 'react-redux';

const spotifyConfig = {
  clientId: '71add05410cb47b99167ee9e3fba37a5',
  clientSecret: '42077071fc94408c9bda9ccded3639f8',
  redirectUrl: 'com.rhythmradar:/oauth',
  scopes: [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
    'user-follow-modify',
    'user-follow-read',
    'user-read-playback-position',
    'user-top-read',
    'user-read-recently-played',
    'user-library-modify',
    'user-library-read',
    'user-read-email',
    'user-read-private',
  ],

  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

const dispatch = useDispatch();

export const handleLogin = async () => {
  try {
    const session = await authorize(spotifyConfig);
    await AsyncStorage.setItem(
      'accessToken',
      JSON.stringify(session.accessToken),
    );
    await AsyncStorage.setItem(
      'expiresIn',
      JSON.stringify(session.accessTokenExpirationDate),
    );
    console.error(session);
    const data = {
      accessToken: session.accessToken,
      error: false,
      expiresIn: session.accessTokenExpirationDate,
    };
    dispatch(setLogin(data));
  } catch (error) {
    console.log(error);
  }
};
