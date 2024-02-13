import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import React from 'react';

const SongCard = ({item, addToPlayList, removeFromPlayList, selectedUris}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.trackInfoContainer}>
          <Image
            style={styles.albumCover}
            source={{
              uri: item?.album?.images[0]?.url,
            }}
          />
          <View style={styles.trackInfo}>
            <Text>
              {item?.name?.length > 30 ? item.name.slice(0, 30) : item.name}
            </Text>
            <Text>
              {item?.artists?.map((artist, index) => (
                <React.Fragment key={artist.id}>
                  {index > 0 && ', '}
                  {artist?.name.length > 30
                    ? artist.name.slice(0, 30)
                    : artist.name}
                </React.Fragment>
              ))}
            </Text>
          </View>
        </View>
        {selectedUris.includes(item.uri) ? (
          <Icon
            name="remove-circle"
            size={28}
            color="#FF0000"
            onPress={() => removeFromPlayList(item.uri)}
          />
        ) : (
          <Icon
            name="add-circle"
            size={28}
            color="#08A045"
            onPress={() => addToPlayList(item.uri)}
          />
        )}
      </View>
    </View>
  );
};

export default SongCard;
