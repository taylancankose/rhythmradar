import {View, FlatList, Dimensions, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  createAddItemToPlaylist,
  getSongRecommendation,
  getUsersPlaylists,
} from '../../../redux/actions/userActions';
import SongCard from '../../../components/SongCard';
import Button from '../../../components/Button';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Playlist = () => {
  const [selectedUris, setSelectedUris] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const playlist = useSelector(state => state.userReducer.playlist);
  const recSongs = useSelector(state => state.userReducer.recSong);
  const accessToken = useSelector(state => state.userReducer.accessToken);
  const select = useSelector(state => state.userReducer.selection);
  const artistIDs = useSelector(state => state.userReducer.selectedIDs);
  const trackIDs = useSelector(state => state.userReducer.selectedTrackIDs);
  const mood = useSelector(state => state.userReducer.mood);
  const {name} = route.params;
  const instrumentalness = useSelector(
    state => state.userReducer.instrumentalness,
  );
  const energy = useSelector(state => state.userReducer.energy);

  const addToPlayList = uri => {
    setSelectedUris(prevUris => [...prevUris, uri]);
  };

  const removeFromPlayList = uri => {
    setSelectedUris(prevUris => prevUris.filter(item => item !== uri));
  };

  const handleSelectAll = () => {
    const selectedTracksUris = recSongs?.tracks.map(item => item.uri);
    setSelectedUris(selectedTracksUris);
  };

  const removeAll = () => {
    setSelectedUris([]);
  };

  const formatIDs = ids =>
    ids?.map((id: string) => id?.replace(/"|,/g, '')).join('%2C');
  const formattedArtistIDs = formatIDs(artistIDs);
  const formattedTrackIDs = formatIDs(trackIDs);
  useEffect(() => {
    dispatch(
      getSongRecommendation({
        accessToken,
        track: formattedTrackIDs,
        artist: formattedArtistIDs,
        energy,
        mood,
        instrumentalness,
        select,
      }),
    );
  }, [
    accessToken,
    formattedTrackIDs,
    formattedArtistIDs,
    mood,
    instrumentalness,
    select,
    name,
  ]);
  useEffect(() => {
    const timer = setTimeout(() => {
      // Burada yapmak istediğiniz işlemleri gerçekleştirin
      dispatch(getUsersPlaylists(accessToken));
    }, 1000); // 5 saniyelik gecikme

    return () => clearTimeout(timer); // Temizleme işlemi
  }, []);

  let myCreatedPlaylist = playlist.items.find(
    list => list.name === route.params.name,
  );
  const handleAddToPlaylist = () => {
    dispatch(
      createAddItemToPlaylist({
        accessToken,
        uris: selectedUris,
        playlistID: myCreatedPlaylist.id,
      }),
    );
    navigation.navigate('Home');
  };
  console.log('playlist ID: ', myCreatedPlaylist?.id);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={
          selectedUris?.length === recSongs?.tracks?.length
            ? removeAll
            : handleSelectAll
        }
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginVertical: 15,
          marginRight: 15,
        }}>
        <Text>
          {selectedUris?.length === recSongs?.tracks?.length
            ? 'Deselect All'
            : 'Select All'}
        </Text>
      </TouchableOpacity>
      {recSongs && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recSongs?.tracks}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SongCard
              item={item}
              addToPlayList={addToPlayList}
              removeFromPlayList={removeFromPlayList}
              selectedUris={selectedUris}
            />
          )}
        />
      )}
      <View style={styles.btnContainer}>
        <Button
          textColor="white"
          onPress={handleAddToPlaylist}
          fontSize={14}
          fontWeight="600"
          title="Add to Playlist"
          color={'cornflowerblue'}
          width={width / 1.05}
        />
      </View>
    </View>
  );
};

export default Playlist;
