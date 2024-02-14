import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  songName: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  artistName: {
    textAlign: 'center',
  },
});
