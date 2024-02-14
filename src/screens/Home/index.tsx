import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  getGenres,
  getMe,
  getUsersPlaylists,
  getUsersTopArtists,
  getUsersTopTracks,
  setAccessToken,
  setLogout,
} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkAccessTokenValid} from '../../utils/convertTime';
import TopArtistsList from '../../components/TopArtistsList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlayListCard from '../../components/PlayListCard';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state?.userReducer.accessToken);
  const topArtists = useSelector(state => state.userReducer.topArtists);
  const expiresIn = useSelector(state => state.userReducer.expiresIn);
  const playlist = useSelector(state => state.userReducer.playlist);
  const me = useSelector(state => state.userReducer.me);
  const [refreshing, setRefreshing] = useState(false);
  const expireTime = expiresIn?.includes(`"`)
    ? expiresIn.substring(1, expiresIn?.length - 1)
    : expiresIn;
  const navigation = useNavigation();
  // const accToken = accessToken?.includes(`"`)
  //   ? accessToken?.substring(1, accessToken?.length - 1)
  //   : accessToken;

  useEffect(() => {
    if (accessToken !== undefined) {
      dispatch(getMe(accessToken));
    }
  }, []);
  if (checkAccessTokenValid(accessToken, expireTime)) {
    console.log('Access token hala geçerli.');
  } else {
    console.log('Access token süresi doldu. Yeniden yetkilendirme yapılmalı.');
    if (me === undefined) {
      dispatch(setAccessToken({accessToken: undefined}));
      dispatch(setLogout());
      AsyncStorage.removeItem('accessToken');
    }
  }

  useEffect(() => {
    if (accessToken !== undefined) {
      dispatch(getUsersTopArtists(accessToken));
      dispatch(getUsersTopTracks(accessToken));
      dispatch(getUsersPlaylists(accessToken));
    }
  }, [accessToken, me, expireTime]);

  useEffect(() => {
    dispatch(getGenres(accessToken));
  }, []);

  const handleLogout = async () => {
    dispatch(setLogout());
    await AsyncStorage.removeItem('accessToken');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getUsersTopArtists(accessToken));
    dispatch(getUsersTopTracks(accessToken));
    dispatch(getUsersPlaylists(accessToken));
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Profile */}
        <View style={styles.profileContainer}>
          <View style={styles.profileInnerContainer}>
            <Image
              source={{
                uri:
                  me?.images[1]?.url ||
                  'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
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
              onPress={() => navigation.navigate('Generate Playlist')}
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
        {/* Top Artists */}
        <View
          style={{
            marginTop: 10,
          }}>
          <Text style={styles.playlistHeader}>Top Artists</Text>
          {topArtists !== null && (
            <FlatList
              data={topArtists?.items}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => <TopArtistsList item={item} />}
            />
          )}
        </View>

        {/* Top Tracks */}
        <View
          style={{
            marginTop: 10,
          }}>
          <Text style={styles.playlistHeader}>Top Artists</Text>
          {topArtists !== null && (
            <FlatList
              data={topArtists?.items}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => <TopArtistsList item={item} />}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
