import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {getSongRecom, getUsersPlaylists} from '../../redux/userSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMe, setLogin, setLogout} from '../../redux/authSlicer';
import {checkAccessTokenValid} from '../../utils/convertTime';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlayListCard from '../../components/PlayListCard';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import styles from './styles';

const Home = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(state => state.authSlicer.accessToken);
  const expiresIn = useSelector(state => state.authSlicer.expiresIn);
  const playlist = useSelector(state => state.userSlicer.playlist);
  const recSong = useSelector(state => state.userSlicer.recSong);
  const me = useSelector(state => state.authSlicer.me);

  const expireTime = expiresIn.includes(`"`)
    ? expiresIn.substring(1, expiresIn?.length - 1)
    : expiresIn;
  const accToken = accessToken.includes(`"`)
    ? accessToken.substring(1, accessToken?.length - 1)
    : accessToken;

  useEffect(() => {
    if (accessToken !== undefined) {
      dispatch(getMe(accToken));
    }
  }, []);

  if (checkAccessTokenValid(accToken, expireTime)) {
    console.log('Access token hala geçerli.');
  } else {
    console.log('Access token süresi doldu. Yeniden yetkilendirme yapılmalı.');
    if (me === undefined) {
      const data = {
        accessToken: undefined,
        error: true,
      };
      dispatch(setLogin(data));
      dispatch(setLogout());
      AsyncStorage.removeItem('accessToken');
    }
    console.error(me, 'ME');
  }

  useEffect(() => {
    if (accessToken !== undefined) {
      dispatch(getUsersPlaylists(accToken));
    }
  }, [accToken, expireTime, me]);

  const topTracksIds = [
    '7tQcC1acYIOLUpoaTABfvN',
    '4ZR5YutZBhiTCsp0EtBznp',
    '3U9dWPUyWBW9RiVUgv9lDt',
    '4OH5Cd8ZOI1eSgJSC9PYmU',
    '28GSxEfVJew8fCa5dhB0iR',
  ];

  const handleLogout = async () => {
    dispatch(setLogout());
    await AsyncStorage.removeItem('accessToken');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Profile */}
        <View style={styles.profileContainer}>
          <View style={styles.profileInnerContainer}>
            <Image
              source={{
                uri: me?.images[1]?.url,
              }}
              style={styles.profilePhoto}
            />
            <View>
              <Text style={styles.userName}>{me?.display_name}</Text>
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
        <View style={styles.generatePlaylistCardContainer}>
          <View style={styles.generatePlaylistCardInnerContainer}>
            <View>
              <Text style={styles.topHeader}>TOP CHART OF THE DAY</Text>
              <Text style={styles.mainHeader}>Let's make a {'\n'}playlist</Text>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(getSongRecom(accessToken))}
              style={styles.createButton}>
              <Text style={styles.buttonText}>Create now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardImageContainer}>
            <Image
              source={require('../../assets/woman.png')}
              style={styles.cardImage}
            />
          </View>
        </View>
        {recSong?.tracks?.map(song => (
          <Text key={song?.id}>{song?.name}</Text>
        ))}
        {/* Playlists */}
        <View>
          <Text style={styles.playlistHeader}>Playlists</Text>
          {playlist !== null && (
            <FlatList
              keyExtractor={item => item.id}
              data={playlist?.items}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <PlayListCard index={index} item={item} />
              )}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
