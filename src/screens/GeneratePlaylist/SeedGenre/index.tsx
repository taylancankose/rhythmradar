import {getGenres, setSelectedGenre} from '../../../redux/actions/userActions';
import {Text, View, FlatList, Dimensions} from 'react-native';
import GenreCard from '../../../components/GenreCard';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import Button from '../../../components/Button';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const SeedGenre = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const genres = useSelector(state => state.userReducer.genres);
  const {width} = Dimensions.get('window');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const sortedGenres = [...genres?.genres].sort((a, b) => {
    const isSelectedGenreA = selectedGenres?.includes(a);
    const isSelectedGenreB = selectedGenres?.includes(b);
    if (isSelectedGenreA && !isSelectedGenreB) {
      return -1;
    } else if (!isSelectedGenreA && isSelectedGenreB) {
      return 1;
    } else {
      return 0;
    }
  });

  const handleNext = () => {
    navigation.navigate('SeedValence');
    dispatch(setSelectedGenre(selectedGenres));
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Base Genres</Text>
        <Text>
          Please select 1 to 5 base genres that reflect your music taste. These
          genres will shape your personalized playlist. More selections give us
          better insights for accurate recommendations across genres and styles.
        </Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Selected Genres</Text>
          <Text style={styles.infoTextNum}>{selectedGenres?.length}/5</Text>
        </View>
      </View>

      {genres?.genres?.length > 2 && (
        <FlatList
          data={sortedGenres}
          keyExtractor={i => i}
          renderItem={({item}) => (
            <GenreCard
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              item={item}
            />
          )}
          scrollEnabled
          numColumns={3}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View style={styles.btnContainer}>
        <Button
          disabled={selectedGenres?.length <= 0 && true}
          textColor="white"
          onPress={handleNext}
          fontSize={14}
          fontWeight="600"
          title="Next"
          color={selectedGenres?.length <= 0 ? 'gray' : 'cornflowerblue'}
          width={width * 0.85}
        />
      </View>
    </View>
  );
};

export default SeedGenre;
