import {
  View,
  Text,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getMe, setLogin} from '../../redux/authSlicer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  // const [me, setMe] = useState();
  const [recSong, setRecSong] = useState();
  const accessToken = useSelector(state => state.authSlicer.accessToken);
  const me = useSelector(state => state.authSlicer.me);
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken !== undefined) {
      const accToken = accessToken.includes(`"`)
        ? accessToken.substring(1, accessToken?.length - 1)
        : accessToken;
      dispatch(getMe(accToken));
    }
    if (me === undefined && !accessToken) {
      const data = {
        accessToken: undefined,
        refreshToken: undefined,
        error: true,
      };
      dispatch(setLogin(data));
    }
  }, [accessToken]);

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

  const topTracksIds = [
    '7tQcC1acYIOLUpoaTABfvN',
    '4ZR5YutZBhiTCsp0EtBznp',
    '3U9dWPUyWBW9RiVUgv9lDt',
    '4OH5Cd8ZOI1eSgJSC9PYmU',
    '28GSxEfVJew8fCa5dhB0iR',
  ];

  const handleLogout = async () => {
    const data = {
      accessToken: undefined,
      refreshToken: undefined,
      error: true,
    };
    dispatch(setLogin(data));
    await AsyncStorage.removeItem('accessToken');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 1,
          margin: 20,
        }}>
        {/* Profile */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: me?.images[1]?.url,
              }}
              style={{
                width: 70,
                height: 70,
                marginRight: 10,
                borderRadius: 50,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: 'black',
                }}>
                {me?.display_name}
              </Text>
              <Text>{me?.followers.total} Followers</Text>
            </View>
          </View>
          <Icon
            onPress={handleLogout}
            name="logout"
            size={24}
            color={'black'}
          />
        </View>
        {/* Generate Playlist */}
        <View
          style={{
            backgroundColor: '#8783D1',
            marginBottom: 5,
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: Dimensions.get('window').height / 4.5,
            elevation: 5,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              padding: 10,
              margin: 10,
            }}>
            <View>
              <Text
                style={{
                  marginBottom: 5,
                  color: '#e6e6e6e6',
                  fontWeight: '400',
                  fontSize: 14,
                }}>
                TOP CHART OF THE DAY
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Stuff You Should {'\n'}Know
              </Text>
            </View>
            <TouchableOpacity
              onPress={getSongRecom}
              style={{
                paddingVertical: 6,
                backgroundColor: '#FFEE93',
                width: Dimensions.get('window').width / 3.5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                elevation: 10,
              }}>
              <Text>Create now</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}>
            <Image
              source={require('../../assets/woman.png')}
              style={{
                width: 100,
                height: Dimensions.get('window').height / 5,
                borderRadius: 15,
              }}
            />
          </View>
        </View>
        {recSong?.tracks?.map(song => (
          <Text key={song?.id}>{song?.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default Home;
