import React, {useState} from 'react';
import styles from './styles';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchResultCard from '../../../components/SearchResultCard';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import {
  searchArtists,
  setArtistResult,
} from '../../../redux/actions/userActions';
import ResultCard from '../../../components/ResultCard';

const SeedArtist = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchedArtists, setSearchedArtists] = useState([]); //{artists: {items: []}}
  const accessToken = useSelector(state => state.userReducer.accessToken);
  const {width} = Dimensions.get('window');
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const searchedArtistData = useSelector(
    state => state.userReducer.selectedArtist,
  );

  const searchAnArtist = txt => {
    dispatch(searchArtists(txt, accessToken));
    setSearchedArtists(searchedArtistData);
  };

  const getNext = async () => {
    if (searchedArtists?.artists?.next) {
      try {
        const response = await axios.get(searchedArtists?.artists?.next, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.data;
        setSearchedArtists(prevData => ({
          ...prevData,
          artists: {
            ...prevData.artists,
            items: [...prevData.artists.items, ...result.artists.items],
            next: result.artists.next,
          },
        }));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('No next URL available.');
    }
  };

  const handleNext = () => {
    navigation.navigate('SeedValence');
    dispatch(setArtistResult(selectedIDs));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.header}>Base Artists</Text>
            <Text>
              Please select 1 to 5 base artists that reflect your music taste.
              These artists will shape your personalized playlist. More
              selections give us better insights for accurate recommendations
              across genres and styles.
            </Text>
          </View>

          <ScrollView style={styles.resultContainer}>
            {selectedArtists.length > 0 && (
              <View style={styles.selectedSongContainer}>
                <Text style={styles.infoText}>Selected Artists</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={styles.cardContainer}>
                  {selectedArtists?.map(artist => (
                    <ResultCard item={artist} type={'artist'} />
                  ))}
                </ScrollView>
              </View>
            )}
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>Selected Artists</Text>
              <Text style={styles.infoTextNum}>{selectedIDs.length}/5</Text>
            </View>
            <View style={styles.inputContainer}>
              <Icon name="search" color="gray" size={22} />
              <TextInput
                placeholder="Bir sanatçı ara"
                onChangeText={txt =>
                  txt.length > 0
                    ? searchAnArtist(
                        txt.includes(' ') ? txt.replace(' ', '+') : txt,
                      )
                    : setSearchedArtists([])
                }
              />
            </View>
            <FlatList
              data={
                searchedArtists?.artists?.items?.length > 0 &&
                searchedArtists?.artists?.items
              }
              renderItem={({item}) => (
                <SearchResultCard
                  item={item}
                  selectedIDs={selectedIDs}
                  setSelectedIDs={setSelectedIDs}
                  selectedArtists={selectedArtists}
                  setSelectedArtists={setSelectedArtists}
                />
              )}
              scrollEnabled
              keyExtractor={item => item?.id}
              numColumns={3}
              onEndReachedThreshold={0.5}
              onEndReached={getNext}
              contentContainerStyle={{
                marginVertical: 5,
              }}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
          <View style={styles.btnContainer}>
            <Button
              disabled={searchedArtists?.length <= 0 && true}
              textColor="white"
              onPress={handleNext}
              fontSize={14}
              fontWeight="600"
              title="Next"
              color={searchedArtists?.length <= 0 ? 'gray' : 'cornflowerblue'}
              width={width * 0.85}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SeedArtist;
