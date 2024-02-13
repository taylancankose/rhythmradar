import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    margin: 5,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width / 1.05,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  btnContainer: {
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
});
