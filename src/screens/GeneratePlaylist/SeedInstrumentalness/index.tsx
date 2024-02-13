import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Button from '../../../components/Button';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setInstrumentalness} from '../../../redux/actions/userActions';
import SliderComp from '../../../components/ArcSlider';
import {percentProps} from '../../../utils/types';

const SeedInstrumentalness = () => {
  const [receivedPercent, setReceivedPercent] = useState<percentProps>();
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
          lyrics) elements.
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
                🎤
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Highly Vocal
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
                🎵
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Moderately Vocal
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
                🎹
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Equally Vocal and Instrumental
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
                🎻
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Moderately Instrumental
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
                🎼
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  marginTop: 15,
                  color: 'black',
                }}>
                Highly Instrumental
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

export default SeedInstrumentalness;
