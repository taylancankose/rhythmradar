import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

type itemTypes = {item: string};

const GenreCard = ({item, selectedGenres, setSelectedGenres}: itemTypes) => {
  if (!item) {
    return null;
  }
  const handleSelect = () => {
    if (selectedGenres) {
      if (selectedGenres?.includes(item)) {
        setSelectedGenres(selectedGenres?.filter(genre => genre !== item));
      } else if (selectedGenres?.length < 5) {
        setSelectedGenres([...selectedGenres, item]);
      }
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectedGenres && selectedGenres?.includes(item) && styles.selected,
      ]}
      onPress={handleSelect}>
      <Text style={[styles.text]}>{item}</Text>
    </TouchableOpacity>
  );
};

export default GenreCard;
