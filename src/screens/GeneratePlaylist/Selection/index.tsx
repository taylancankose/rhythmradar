import React, {useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSelection} from '../../../redux/actions/userActions';

const Selection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const renderOption = (option, emoji, text) => (
    <TouchableOpacity
      onPress={() => handleOptionSelect(option)}
      style={{
        maxWidth: Dimensions.get('window').width / 2.25,
        height: 150,
        padding: 10,
        borderRadius: 5,
        backgroundColor: selectedOption === option ? '#FFD700' : '#E3FFDA',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 30,
          textAlign: 'center',
        }}>
        {emoji}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 10,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
  const handleNext = () => {
    if (selectedOption === 'tracks') {
      navigation.navigate('SeedTrack');
    } else if (selectedOption === 'artistsGenres') {
      navigation.navigate('SeedArtist');
    }
    dispatch(setSelection(selectedOption));
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'white',
        }}>
        {renderOption(
          'artistsGenres',
          '🎤',
          'Generate with Favorite Artists & Genres',
        )}
        {renderOption('tracks', '🎵', 'Generate with Favorite Tracks')}
      </View>
      <View
        style={{
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {selectedOption && (
          <Button
            title="Next"
            color="cornflowerblue"
            width={'90%'}
            onPress={handleNext}
          />
        )}
      </View>
    </View>
  );
};

export default Selection;
