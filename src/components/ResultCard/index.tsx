import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';

const ResultCard = ({item, type}) => {
  return (
    <View style={styles.cardInnerContainer}>
      <Image
        style={styles.img}
        source={{
          uri:
            type === 'artist'
              ? item?.images[0]?.url
              : item?.album?.images[0]?.url,
        }}
      />
      <Text style={styles.name}>{item?.name.slice(0, 9)}...</Text>
      {type === 'track' &&
        item?.artists.map((artist, i) => (
          <Text key={i}>{artist.name.slice(0, 9)}...</Text>
        ))}
    </View>
  );
};

export default ResultCard;
