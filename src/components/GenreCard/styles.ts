import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 10,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 60,
    borderColor: '#a6a5a5',
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    maxWidth: 80,
    textTransform: 'capitalize',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  selected: {
    borderColor: 'coral',
    borderWidth: 2,
  },
});
