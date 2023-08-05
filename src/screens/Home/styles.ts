import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    margin: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profileInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  generatePlaylistCardContainer: {
    backgroundColor: '#6741FF',
    marginBottom: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height / 4.5,
    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  generatePlaylistCardInnerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  topHeader: {
    marginBottom: 5,
    color: '#e6e6e6e6',
    fontWeight: '400',
    fontSize: 14,
  },
  mainHeader: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  createButton: {
    paddingVertical: 6,
    backgroundColor: '#DEFC22',
    width: Dimensions.get('window').width / 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
  },
  buttonText: {
    color: 'black',
    fontWeight: '500',
  },
  cardImageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  cardImage: {
    width: 100,
    height: Dimensions.get('window').height / 5,
    borderRadius: 15,
  },
  playlistHeader: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: '700',
    color: 'black',
  },
});
