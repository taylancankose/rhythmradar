import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSongRecommendation} from '../../../redux/actions/userActions';
const Playlist = () => {
  const recSongs = useSelector(state => state.userReducer.recSong);
  const accessToken = useSelector(state => state.userReducer.accessToken);
  const select = useSelector(state => state.userReducer.selection);
  const artistIDs = useSelector(state => state.userReducer.selectedIDs);
  const trackIDs = useSelector(state => state.userReducer.selectedTrackIDs);
  const genres = useSelector(state => state.userReducer.selectedGenres);
  const mood = useSelector(state => state.userReducer.mood);
  const instrumentalness = useSelector(
    state => state.userReducer.instrumentalness,
  );
  const energy = useSelector(state => state.userReducer.energy);

  const formatIDs = ids =>
    ids?.map((id: string) => id?.replace(/"|,/g, '')).join('%2C');
  const formattedArtistIDs = formatIDs(artistIDs);
  const formattedTrackIDs = formatIDs(trackIDs);
  const formattedGenres = genres
    ?.map((genre: string) => genre?.replace(/"|,/g, ''))
    .join('%2C');

  const dispatch = useDispatch();
  console.log(recSongs);
  useEffect(() => {
    dispatch(
      getSongRecommendation({
        accessToken,
        track: formattedTrackIDs,
        artist: formattedArtistIDs,
        genre: formattedGenres,
        energy,
        mood,
        instrumentalness,
        select,
      }),
    );
  }, []);

  return (
    <View>
      {recSongs && (
        <FlatList
          data={recSongs?.tracks}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Text>{item?.name}</Text>}
        />
      )}
    </View>
  );
};

export default Playlist;
