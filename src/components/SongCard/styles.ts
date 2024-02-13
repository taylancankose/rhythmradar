import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: width / 1.05,
    padding: 10,
    margin: 4,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumCover: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  trackInfo: {
    marginLeft: 10,
  },
});
