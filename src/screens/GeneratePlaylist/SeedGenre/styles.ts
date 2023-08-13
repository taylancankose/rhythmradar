import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    margin: 20,
    position: 'relative',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  infoTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  infoTextNum: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
