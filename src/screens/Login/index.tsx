import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../redux/authSlicer';

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

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const session = await authorize(spotifyConfig);
      await AsyncStorage.setItem(
        'accessToken',
        JSON.stringify(session.accessToken),
      );
      console.error(session);
      await AsyncStorage.setItem(
        'refreshToken',
        JSON.stringify(session.refreshToken),
      );
      const data = {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        error: false,
      };
      dispatch(setLogin(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      imageStyle={{
        backgroundColor: 'black',
        opacity: 0.5,
      }}
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
      source={{
        uri: 'https://images.unsplash.com/photo-1502773860571-211a597d6e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      }}>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',
          zIndex: 500,
        }}>
        <Text
          style={{
            fontSize: 34,
            color: 'white',
            fontWeight: 'bold',
            margin: 12,
          }}>
          Rhythm Radar
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#e6e6e6e6',
            margin: 12,
          }}>
          Get Ready for a Rhythm Journey with Rhythm Radar! Are You Ready to
          Explore and Dance?
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          flex: 0.3,
          marginBottom: 30,
          zIndex: 500,
        }}>
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.92}
          style={{
            backgroundColor: '#1DB954',
            padding: 12,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            borderRadius: 30,
            elevation: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '700',
              fontSize: 17,
            }}>
            Login with Spotify
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: 'white',
            fontSize: 14,
            color: '#e6e6e6e6',
            textAlign: 'center',
            textDecorationLine: 'underline',
            fontWeight: '500',
          }}>
          Why do we need to Spotify
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Login;
