import {View, Text, TouchableOpacity, Linking, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const PlayListCard = ({item, index}) => {
  const colors = ['#FFE6CA', '#E3FFDA', '#CAE1FF', '#FFCBCA'];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors[index % colors.length],
        },
      ]}>
      <View style={styles.cardContainer}>
        <Image source={{uri: item.images[0].url}} style={styles.image} />
        <View style={styles.infoTextContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {item.name}
          </Text>
          <Text style={styles.ownerName}>{item.owner.display_name}</Text>
          <Text style={styles.songNum}>{item.tracks.total} songs</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => Linking.openURL(item.external_urls.spotify)}
        style={styles.playButton}>
        <Icon name="play-circle" size={25} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default PlayListCard;
