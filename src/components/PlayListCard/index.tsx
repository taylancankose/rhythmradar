import {View, Text, TouchableOpacity, Linking, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {playContext} from '../../redux/userSlicer';
import axios from 'axios';

const PlayListCard = ({item, index}) => {
  const colors = ['#FFE6CA', '#E3FFDA', '#CAE1FF', '#FFCBCA'];
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.authSlicer.accessToken);
  const player = useSelector(state => state.userSlicer.play);
  console.error(player);
  const accToken = accessToken.includes(`"`)
    ? accessToken.substring(1, accessToken?.length - 1)
    : accessToken;
  console.log(item.uri);
  const play = async () => {
    await axios.put(
      'https://api.spotify.com/v1/me/player/play',
      {
        context_uri: item.uri,
        offset: {
          position: 5,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${
            accToken.includes(`"`)
              ? accToken.substring(1, accToken?.length - 1)
              : accToken
          }`,
        },
      },
    );
    setIsPlaying(true);
  };
  const pause = async () => {
    await axios.put(
      'https://api.spotify.com/v1/me/player/pause',
      {
        context_uri: item.uri,
        offset: {
          position: 5,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${
            accToken.includes(`"`)
              ? accToken.substring(1, accToken?.length - 1)
              : accToken
          }`,
        },
      },
    );
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
