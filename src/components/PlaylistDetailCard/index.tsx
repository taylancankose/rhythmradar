import {Image, View, Text} from 'react-native';
import React from 'react';

const PlaylistDetailCard = ({item}) => {
  return (
    <View
      style={{
        margin: 5,
        padding: 5,
      }}>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#131313',
            fontSize: 16,
          }}>
          {item?.track?.name}
        </Text>
        <Text>
          {item?.track?.artists?.map((artist, index) => (
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
  );
};

export default PlaylistDetailCard;
