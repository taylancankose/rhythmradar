import React, {useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSelection} from '../../../redux/actions/userActions';
import styles from './styles';
import SelectOption from '../../../components/SelectionOption';

const {width} = Dimensions.get('window');

const Selection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (selectedOption === 'tracks') {
      navigation.navigate('SeedTrack');
    } else if (selectedOption === 'artists') {
      navigation.navigate('SeedArtist');
    }
    dispatch(setSelection(selectedOption));
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <SelectOption
          emoji={'🎤'}
          text={'Generate with Favorite Artists'}
          option={'artists'}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <SelectOption
          emoji={'🎵'}
          text={'Generate with Favorite Tracks'}
          option={'tracks'}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          disabled={!selectedOption && true}
          textColor="white"
          onPress={handleNext}
          fontSize={14}
          fontWeight="600"
          title="Next"
          color={!selectedOption ? 'gray' : 'cornflowerblue'}
          width={width * 0.85}
        />
      </View>
    </View>
  );
};

export default Selection;
