import {View, Text} from 'react-native';
import React, {useState} from 'react';
import ArcSlider from '../../../components/ArcSlider';
import styles from './styles';
import Button from '../../../components/Button';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setEnergy} from '../../../redux/actions/userActions';

const SeedEnergy = () => {
  const [receivedPercent, setReceivedPercent] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getEnergyExplanation = value => {
    if (value <= 0.2) {
      return {
        emoji: `😴`,
        description: 'Low Energy',
      };
    } else if (value <= 0.4) {
      return {
        emoji: `😐`,
        description: 'Moderate Energy',
      };
    } else if (value <= 0.6) {
      return {
        emoji: `😃`,
        description: 'High Energy',
      };
    } else if (value <= 0.8) {
      return {
        emoji: `🚀`,
        description: 'Very High Energy',
      };
    } else {
      return {
        emoji: `🔥`,
        description: 'Extreme Energy',
      };
    }
  };
  const handleReceivePercent = data => {
    setReceivedPercent(data);
  };
  const handleNext = () => {
    if (receivedPercent) {
      dispatch(setEnergy(receivedPercent));
    } else {
      dispatch(setEnergy(0));
    }

    navigation.navigate('Playlist');
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Energy</Text>
        <Text>
          Represents the energy level of a song. Energy level indicates how
          lively, dynamic, and energetic a song is. The value range is between 0
          and 1.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <ArcSlider
          getEmoji={value => getEnergyExplanation(value)}
          sendPercentData={handleReceivePercent}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          textColor="white"
          color="cornflowerblue"
          width={'90%'}
          title="Next"
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default SeedEnergy;
