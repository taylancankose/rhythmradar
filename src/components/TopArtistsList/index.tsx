import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import React from 'react';
import styles from './styles';

const TopArtistsList = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(item.external_urls.spotify)}>
      <View style={styles.container}>
        <Image
          source={{
            uri:
              item.images[0].url ||
              'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
          }}
          style={styles.image}
        />
        <Text style={styles.artistName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopArtistsList;
