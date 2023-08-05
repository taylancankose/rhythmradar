import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import React from 'react';
import styles from './styles';

const TopArtistsList = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(item.external_urls.spotify)}>
      <View style={styles.container}>
        <Image source={{uri: item.images[0].url}} style={styles.image} />
        <Text style={styles.artistName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopArtistsList;
