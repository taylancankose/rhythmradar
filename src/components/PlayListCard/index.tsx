import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {pauseContext, playContext} from '../../redux/actions/userActions';

const PlayListCard = ({item, index}) => {
  const colors = ['#FFE6CA', '#E3FFDA', '#CAE1FF', '#FFCBCA'];
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state?.userReducer.accessToken);

  const play = () => {
    dispatch(playContext(accessToken, item.uri));
    setIsPlaying(true);
  };
  const pause = () => {
    dispatch(pauseContext(accessToken, item.uri));
    setIsPlaying(false);
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors[index % colors.length],
        },
      ]}>
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri:
              item.images[0].url ||
              'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.infoTextContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {item.name}
          </Text>
          <Text style={styles.ownerName}>{item.owner.display_name}</Text>
          <Text style={styles.songNum}>{item.tracks.total} songs</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={isPlaying ? pause : play}
        style={styles.playButton}>
        {isPlaying ? (
          <Icon name="pause-circle" size={25} color={'black'} />
        ) : (
          <Icon name="play-circle" size={25} color={'black'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PlayListCard;
