import {
  View,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import styles from './styles';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import SearchResultCard from '../../../components/SearchResultCard';
import {searchTrack} from '../../../redux/actions/userActions';
import ResultCard from '../../../components/ResultCard';

const SeedTrack = () => {
  const navigation = useNavigation();
  const [trackList, setTrackList] = useState([]);
  const accessToken = useSelector(state => state.userReducer.accessToken);
  const {width} = Dimensions.get('window');
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const dispatch = useDispatch();
  const searchedTracks = useSelector(
    state => state.userReducer.searchTrackResult,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, []);

  const searchATrack = txt => {
    dispatch(searchTrack(txt, accessToken));
    setTrackList(searchedTracks);
  };

  const getNext = async () => {
    if (trackList?.tracks?.next) {
      try {
        const response = await axios.get(trackList?.tracks?.next, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.data;
        setTrackList(prevData => ({
          ...prevData,
          tracks: {
            ...prevData.tracks,
            items: [...prevData.tracks.items, ...result.tracks.items],
            next: result.tracks.next,
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
    dispatch(setTracksResult(selectedIDs));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.header}>Base Tracks</Text>
            <Text>
              Please select 1 to 5 base tracks that reflect your music taste.
              These tracks will shape your personalized playlist. More
              selections give us better insights for accurate recommendations
              across genres and styles.
            </Text>
          </View>
          <ScrollView style={styles.resultContainer}>
            {selectedTracks.length > 0 && (
              <View
                style={{
                  paddingVertical: 10,
                  display: 'flex',
                }}>
                <Text style={styles.infoText}>Selected Songs</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  {selectedTracks?.length > 0 &&
                    selectedTracks?.map(track => (
                      <ResultCard item={track} type={'track'} />
                    ))}
                </ScrollView>
              </View>
            )}
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>Selected Songs</Text>
              <Text style={styles.infoTextNum}>{selectedIDs.length}/5</Text>
            </View>
            <View style={styles.inputContainer}>
              <Icon name="search" color="gray" size={22} />
              <TextInput
                placeholder="Bir şarkı ara"
                onChangeText={txt => txt.length > 0 && searchATrack(txt)}
              />
            </View>
            <FlatList
              data={
                trackList?.tracks?.items?.length > 0 && trackList?.tracks?.items
              }
              renderItem={({item}) => (
                <SearchResultCard
                  item={item}
                  selectedIDs={selectedIDs}
                  setSelectedIDs={setSelectedIDs}
                  selectedTracks={selectedTracks}
                  setSelectedTracks={setSelectedTracks}
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
              disabled={trackList?.length <= 0 && true}
              textColor="white"
              onPress={handleNext}
              fontSize={14}
              fontWeight="600"
              title="Next"
              color={trackList?.length <= 0 ? 'gray' : 'cornflowerblue'}
              width={width * 0.85}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SeedTrack;
