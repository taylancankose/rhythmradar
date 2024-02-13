import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'black',
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
