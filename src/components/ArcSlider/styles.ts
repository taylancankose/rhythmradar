import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  canvas: {
    flex: 0.6,
  },
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  valueText: {
    fontSize: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    opacity: 100,
    color: 'black',
  },
  valueDesc: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
  },
});
