import {View, Text, TextInput, Dimensions, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import styles from './styles';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import SearchResultCard from '../../../components/SearchResultCard';
import {setTracksResult, searchTrack} from '../../../redux/actions/userActions';

const SeedTrack = () => {
  const navigation = useNavigation();
  const [selectedTracks, setSelectedTracks] = useState({tracks: {items: []}});
  const accessToken = useSelector(state => state.userReducer.accessToken);
  const {width} = Dimensions.get('window');
  const [selectedIDs, setSelectedIDs] = useState([]);
  const topTracks = useSelector(state => state.userReducer.topTracks);
  const dispatch = useDispatch();
  const searchedTracks = useSelector(
    state => state.userReducer.searchTrackResult,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, []);

  // const searchTrack = async input => {
  //   try {
  //     const result = await axios.get(
  //       `https://api.spotify.com/v1/search?q=${input}&type=track`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );
  //     const response = await result.data;
  //     setSelectedTracks(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const searchATrack = async txt => {
    await dispatch(searchTrack(txt, accessToken));
    setSelectedTracks(searchedTracks);
  };
  console.log(selectedTracks, 'selected');
  const getNext = async () => {
    if (selectedTracks?.tracks?.next) {
      try {
        const response = await axios.get(selectedTracks?.tracks?.next, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.data;
        setSelectedTracks(prevData => ({
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

  const sortedTopTracks = [...topTracks?.items].sort((a, b) => {
    const isselectedTracksA = selectedIDs.includes(a.id);
    const isselectedTracksB = selectedIDs.includes(b.id);
    if (isselectedTracksA && !isselectedTracksB) {
      return -1;
    } else if (!isselectedTracksA && isselectedTracksB) {
      return 1;
    } else {
      return 0;
    }
  });

  const getSortedResults = () => {
    if (selectedTracks) {
      const sortedTrack = [...selectedTracks?.tracks?.items].sort((a, b) => {
        const isSelectedA = selectedIDs.includes(a.id);
        const isSelectedB = selectedIDs.includes(b.id);
        if (isSelectedA && !isSelectedB) {
          return -1; // a seçili b değilse a önde
        } else if (!isSelectedA && isSelectedB) {
          return 1; // b seçili a değilse b önde
        }
        return 0; // ikisi de seçili değilse olduğu gibi bırak
      });

      return [
        ...selectedIDs.map(id => sortedTrack.find(item => item.id === id)),
        ...sortedTrack.filter(item => !selectedIDs.includes(item.id)),
      ];
    }
  };
  const handleNext = () => {
    navigation.navigate('SeedValence');
    dispatch(setTracksResult(selectedIDs));
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.header}>Base Tracks</Text>
          <Text>
            Please select 1 to 5 base tracks that reflect your music taste.
            These tracks will shape your personalized playlist. More selections
            give us better insights for accurate recommendations across genres
            and styles.
          </Text>
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
        </View>
        <View style={styles.resultContainer}>
          <FlatList
            data={
              selectedTracks?.tracks?.items?.length > 0
                ? getSortedResults()
                : sortedTopTracks
            }
            renderItem={({item}) => (
              <SearchResultCard
                item={item}
                selectedIDs={selectedIDs}
                setSelectedIDs={setSelectedIDs}
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
        </View>
        <View style={styles.btnContainer}>
          <Button
            disabled={selectedTracks?.length <= 0 && true}
            textColor="white"
            onPress={handleNext}
            fontSize={14}
            fontWeight="600"
            title="Next"
            color={selectedTracks?.length <= 0 ? 'gray' : 'cornflowerblue'}
            width={width * 0.85}
          />
        </View>
      </View>
    </View>
  );
};

export default SeedTrack;
