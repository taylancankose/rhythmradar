import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  imageStyle: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flex: 0.7,
    justifyContent: 'center',
    zIndex: 500,
  },
  header: {
    fontSize: 34,
    color: 'white',
    fontWeight: 'bold',
    margin: 12,
  },
  slogan: {
    fontSize: 18,
    color: '#e6e6e6e6',
    margin: 12,
  },
  buttonContainer: {
    justifyContent: 'center',
    flex: 0.3,
    marginBottom: 30,
    zIndex: 500,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 30,
    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },
  explanationText: {
    fontSize: 14,
    color: '#e6e6e6e6',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
