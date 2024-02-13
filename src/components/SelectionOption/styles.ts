import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    maxWidth: Dimensions.get('window').width / 2.25,
    height: 150,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
  },
});
