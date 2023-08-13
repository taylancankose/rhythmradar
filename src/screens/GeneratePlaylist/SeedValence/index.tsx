import {View, Text} from 'react-native';
import React, {useState} from 'react';
import ArcSlider from '../../../components/ArcSlider';
import styles from './styles';
import Button from '../../../components/Button';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setValence} from '../../../redux/actions/userActions';

const SeedValence = () => {
  const [receivedPercent, setReceivedPercent] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getEmoji = value => {
    if (value <= 0.2) {
      return {
        emoji: `😔`,
        description: 'Sad',
      };
    } else if (value <= 0.4) {
      return {
        emoji: `😕`,
        description: 'Neutral',
      };
    } else if (value <= 0.6) {
      return {
        emoji: `😊`,
        description: 'Happy',
      };
    } else if (value <= 0.8) {
      return {
        emoji: `🤩`,
        description: 'Excited',
      };
    } else {
      return {
        emoji: `🥳`,
        description: 'Very Excited',
      };
    }
  };
  const handleReceivePercent = data => {
    setReceivedPercent(data);
  };
  const handleNext = () => {
    if (receivedPercent) {
      dispatch(setValence(receivedPercent));
    } else {
      dispatch(setValence(0));
    }
    navigation.navigate('SeedInstrumentalness');
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>How is your Mood?</Text>
        <Text>
          Your mood reflects a song's emotional intensity, ranging from 0
          (negative/sad) to 1 (positive/happy). It helps gauge a song's
          atmosphere and emotional tone.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <ArcSlider
          getEmoji={value => getEmoji(value)}
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

export default SeedValence;
