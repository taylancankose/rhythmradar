import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, TextInput, Dimensions, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchResultCard from '../../../components/SearchResultCard';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import {
  getUsersTopArtists,
  searchArtists,
  setArtistResult,
} from '../../../redux/actions/userActions';

const SeedArtist = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedArtist, setSelectedArtist] = useState([]); //{artists: {items: []}}
  const accessToken = useSelector(state => state.userReducer.accessToken);
  const {width} = Dimensions.get('window');
  const [selectedIDs, setSelectedIDs] = useState([]);
  const topArtists = useSelector(state => state.userReducer.topArtists);
  const searchedArtistData = useSelector(
    state => state.userReducer.selectedArtist,
  );

  useEffect(() => {
    if (!selectedArtist) {
      dispatch(getUsersTopArtists(accessToken));
    }
  }, []);

  useEffect(() => {
    if (searchedArtistData && searchedArtistData.artists) {
      setSelectedArtist(searchedArtistData);
    }
  }, [searchedArtistData]);

  const sortedTopArtists = [...topArtists.items].sort((a, b) => {
    const isSelectedArtistA = selectedIDs.includes(a.id);
    const isSelectedArtistB = selectedIDs.includes(b.id);
    if (isSelectedArtistA && !isSelectedArtistB) {
      return -1;
    } else if (!isSelectedArtistA && isSelectedArtistB) {
      return 1;
    } else {
      return 0;
    }
  });

  const getSortedResults = () => {
    const sortedArtist = [...selectedArtist?.artists?.items].sort((a, b) => {
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
      ...selectedIDs.map(id => sortedArtist.find(item => item.id === id)),
      ...sortedArtist.filter(item => !selectedIDs.includes(item.id)),
    ];
  };

  const searchAnArtist = async txt => {
    await dispatch(searchArtists(txt, accessToken));
    setSelectedArtist(searchedArtistData);
  };

  const getNext = async () => {
    if (selectedArtist?.artists?.next) {
      try {
        const response = await axios.get(selectedArtist?.artists?.next, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const result = await response.data;
        setSelectedArtist(prevData => ({
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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.header}>Base Artists</Text>
          <Text>
            Please select 1 to 5 base artists that reflect your music taste.
            These artists will shape your personalized playlist. More selections
            give us better insights for accurate recommendations across genres
            and styles.
          </Text>
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
                  : setSelectedArtist([])
              }
            />
          </View>
        </View>
        <View style={styles.resultContainer}>
          <FlatList
            data={
              selectedArtist?.artists?.items?.length > 0
                ? getSortedResults()
                : sortedTopArtists
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
            disabled={selectedArtist.length <= 0 && true}
            textColor="white"
            onPress={handleNext}
            fontSize={14}
            fontWeight="600"
            title="Next"
            color={selectedArtist.length <= 0 ? 'gray' : 'cornflowerblue'}
            width={width * 0.85}
          />
        </View>
      </View>
    </View>
  );
};

export default SeedArtist;
