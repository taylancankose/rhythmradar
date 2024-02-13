import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getPlaylist} from '../../redux/actions/userActions';
import PlaylistDetailCard from '../../components/PlaylistDetailCard';

const SelectedPlaylist = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {playlistID} = route.params;
  const selectedPlaylist = useSelector(
    state => state.userReducer.selectedPlaylist,
  );
  const accessToken = useSelector(state => state.userReducer.accessToken);

  useEffect(() => {
    dispatch(
      getPlaylist({
        accessToken,
        playlistID,
      }),
    );
  }, [accessToken, playlistID]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.playlistImage}
          source={{
            uri: selectedPlaylist?.images[0]?.url,
          }}
        />
        <Text style={styles.playlistName}>{selectedPlaylist?.name}</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.trackList}
        data={selectedPlaylist?.tracks?.items}
        renderItem={({item}) => <PlaylistDetailCard item={item} />}
        keyExtractor={item => item.track.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#2E3B4E',
  },
  playlistImage: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderRadius: 10,
  },
  playlistName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  trackList: {
    padding: 16,
  },
});

export default SelectedPlaylist;
