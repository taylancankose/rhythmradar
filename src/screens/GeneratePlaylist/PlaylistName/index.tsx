import {View, Text, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {createPlaylist} from '../../../redux/actions/userActions';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const PlaylistName = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const accessToken = useSelector(state => state.userReducer.accessToken);
  const me = useSelector(state => state.userReducer.me);
  const [name, setName] = useState('');

  const handleCreatePlaylist = () => {
    dispatch(
      createPlaylist({
        accessToken,
        userID: me.id,
        playlistName: name,
      }),
    );
    navigation.navigate('Playlist', {
      name: name,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create The Playlist</Text>
      <View
        style={{
          marginBottom: 10,
        }}>
        <TextInput
          style={styles.input}
          placeholder="Name of the Playlist"
          onChangeText={txt => setName(txt)}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          disabled={!name.length > 0 ? true : false}
          textColor="white"
          onPress={handleCreatePlaylist}
          fontSize={14}
          fontWeight="600"
          title="Create the Playlist"
          color={'cornflowerblue'}
          width={width / 1.05}
        />
      </View>
    </View>
  );
};

export default PlaylistName;
