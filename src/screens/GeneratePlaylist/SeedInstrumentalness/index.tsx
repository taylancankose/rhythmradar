import {View, Text} from 'react-native';
import React, {useState} from 'react';
import ArcSlider from '../../../components/ArcSlider';
import styles from './styles';
import Button from '../../../components/Button';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setInstrumentalness} from '../../../redux/actions/userActions';

const SeedInstrumentalness = () => {
  const [receivedPercent, setReceivedPercent] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getInstrumentalnessEmoji = value => {
    if (value <= 0.2) {
      return {
        emoji: '🎤',
        description: 'Highly Vocal',
      };
    } else if (value <= 0.4) {
      return {
        emoji: '🎵',
        description: 'Moderately Vocal',
      };
    } else if (value <= 0.6) {
      return {
        emoji: '🎹',
        description: 'Equally Vocal and Instrumental',
      };
    } else if (value <= 0.8) {
      return {
        emoji: '🎻',
        description: 'Moderately Instrumental',
      };
    } else {
      return {
        emoji: '🎼',
        description: 'Highly Instrumental',
      };
    }
  };

  const handleReceivePercent = data => {
    setReceivedPercent(data);
  };
  const handleNext = () => {
    if (receivedPercent) {
      dispatch(setInstrumentalness(receivedPercent));
    } else {
      dispatch(setInstrumentalness(0));
    }
    navigation.navigate('SeedEnergy');
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Instrumentalness</Text>
        <Text>
          Instrumental intensity refers to how much of a song's content consists
          of instrumental (played by musical instruments) or vocal (containing
          lyrics) elements. The value range is between 0 and 1.{receivedPercent}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <ArcSlider
          getEmoji={value => getInstrumentalnessEmoji(value)}
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

export default SeedInstrumentalness;
