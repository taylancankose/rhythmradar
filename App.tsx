import React, {useEffect, useState} from 'react';
import {Button, Image, SafeAreaView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onLogin, refreshLogin} from './src/utils/authHandler';
import axios from 'axios';

function App(): JSX.Element {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [me, setMe] = useState();
  const [recSong, setRecSong] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken?.substring(
        1,
        accessToken?.length - 1,
      )}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (token !== null) {
        setAccessToken(token);
        setRefreshToken(refreshToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAccessToken();
  }, []);

  const getMe = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', config);
      const res = await response.data;
      setMe(res);
    } catch (error) {
      console.log(error, 'hata');
      setAccessToken(null);
      setRefreshToken(null);
    }
  };

  useEffect(() => {
    if (accessToken !== null) getMe();
  }, [accessToken]);
  console.log(accessToken);

  const getSongRecom = async () => {
    try {
      console.log('basıldı');
      const res = await fetch(
        'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA',
        {
          headers: {
            Authorization: `Bearer ${accessToken?.substring(
              1,
              accessToken?.length - 1,
            )}`,
          },
        },
      );
      const response = await res.json();
      setRecSong(response);
    } catch (error) {
      console.log(error, 'rec error');
    }
  };
  console.log(recSong);
  console.log(me);

  const topTracksIds = [
    '7tQcC1acYIOLUpoaTABfvN',
    '4ZR5YutZBhiTCsp0EtBznp',
    '3U9dWPUyWBW9RiVUgv9lDt',
    '4OH5Cd8ZOI1eSgJSC9PYmU',
    '28GSxEfVJew8fCa5dhB0iR',
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {accessToken !== null ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: me?.images[1]?.url,
            }}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Text>{me?.display_name}</Text>
          <Text>{me?.followers.total} Followers</Text>
          <Button title="get recommendation" onPress={getSongRecom} />
          <Button
            title="logout"
            onPress={async () => {
              setAccessToken(null);
              await AsyncStorage.removeItem('accessToken');
            }}
          />
          {recSong?.tracks.map(song => (
            <Text key={song?.id}>{song?.name}</Text>
          ))}
        </View>
      ) : (
        <>
          <Text>Selam</Text>
          <Button title="connect" onPress={onLogin} />
        </>
      )}
    </SafeAreaView>
  );
}

export default App;
