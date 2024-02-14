import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    marginRight: 5,
    height: Dimensions.get('window').height / 4,
    paddingHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  infoTextContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    width: Dimensions.get('window').width / 5,
  },
  title: {
    fontWeight: '700',
    color: 'black',
  },
  ownerName: {
    fontSize: 12,
    color: '#64676d',
  },
  songNum: {
    fontSize: 12,
    color: '#64676d',
  },
  playButton: {
    height: 40,
    width: 40,
    backgroundColor: '#DEFC22',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,

    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
