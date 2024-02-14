import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';

const SearchResultCard = ({
  item,
  setSelectedIDs,
  selectedIDs,
  setSelectedArtists,
  selectedArtists,
  setSelectedTracks,
  selectedTracks,
}) => {
  if (!item || !item.id) {
    return null;
  }
  const handleSelect = () => {
    if (selectedIDs.includes(item?.id)) {
      setSelectedIDs(selectedIDs.filter(id => id !== item?.id)); // Seçiliyse çıkar
    } else if (selectedIDs.length < 5) {
      setSelectedIDs([...selectedIDs, item?.id]); // Seçili değilse ekle (5 öğe sınırlamasını kontrol et)
    }
    if (selectedArtists) {
      if (selectedArtists.includes(item)) {
        setSelectedArtists(selectedArtists.filter(artist => artist !== item));
      } else if (selectedIDs.length < 5) {
        setSelectedArtists([...selectedArtists, item]);
      }
    } else if (selectedTracks) {
      if (selectedTracks.includes(item)) {
        setSelectedTracks(selectedTracks.filter(track => track !== item));
      } else if (selectedIDs.length < 5) {
        setSelectedTracks([...selectedTracks, item]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelect}>
        {!item?.artists ? (
          <Image
            style={[
              styles.image,
              selectedIDs.includes(item?.id) && {
                borderWidth: 2,
                borderColor: 'coral',
              },
            ]}
            source={{
              uri:
                item?.images[0]?.url ||
                'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
            }}
          />
        ) : (
          <Image
            style={[
              styles.image,
              selectedIDs.includes(item?.id) && {
                borderWidth: 2,
                borderColor: 'coral',
              },
            ]}
            source={{
              uri:
                item?.album?.images[0]?.url ||
                'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
            }}
          />
        )}
        <Text style={styles.songName}>
          {item?.name?.length > 5
            ? `${item?.name?.slice(0, 10)}...`
            : item?.name}
        </Text>
        {item?.artists?.map(artist => (
          <Text style={styles.artistName} key={artist.id}>
            {artist?.name.length > 5 ? artist.name.slice(0, 10) : artist.name}
          </Text>
        ))}
      </TouchableOpacity>
    </View>
  );
};

export default SearchResultCard;
