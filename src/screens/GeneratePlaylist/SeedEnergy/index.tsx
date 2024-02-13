import {View, Text} from 'react-native';
import React, {useState} from 'react';
import ArcSlider from '../../../components/ArcSlider';
import styles from './styles';
import Button from '../../../components/Button';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setEnergy} from '../../../redux/actions/userActions';
import {percentProps} from '../../../utils/types';
import SliderComp from '../../../components/ArcSlider';

const SeedEnergy = () => {
  const [receivedPercent, setReceivedPercent] = useState<percentProps>();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNext = () => {
    if (receivedPercent) {
      dispatch(setEnergy(receivedPercent));
    } else {
      dispatch(setEnergy(0));
    }

    navigation.navigate('PlaylistName');
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          {receivedPercent <= 0.2 ||
          receivedPercent === 0 ||
          receivedPercent === undefined ? (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 54,
                  color: 'black',
                }}>
                😴
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Low Energy
              </Text>
            </>
          ) : receivedPercent <= 0.4 ? (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 54,
                  color: 'black',
                }}>
                😐
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Moderate Energy
              </Text>
            </>
          ) : receivedPercent <= 0.6 ? (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 54,
                  color: 'black',
                }}>
                😃
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                High Energy
              </Text>
            </>
          ) : receivedPercent <= 0.8 ? (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 54,
                  color: 'black',
                }}>
                🚀
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Very High Energy
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 54,
                  color: 'black',
                }}>
                🔥
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Extreme Energy
              </Text>
            </>
          )}
        </View>
        <SliderComp
          value={receivedPercent}
          onValueChange={setReceivedPercent}
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
