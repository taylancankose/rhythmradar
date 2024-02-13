import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Button from '../../../components/Button';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setValence} from '../../../redux/actions/userActions';
import Slider from '@react-native-community/slider';
import {percentProps} from '../../../utils/types';

const SeedValence = () => {
  const [receivedPercent, setReceivedPercent] = useState<percentProps>(0.5);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //     emoji: `😔`,
  //     description: 'Sad',
  //     value: [0, 0.2],
  //   },
  //   {
  //     emoji: `😕`,
  //     description: 'Neutral',
  //     value: [0.2, 0.4],
  //   },
  //   {
  //     emoji: `😊`,
  //     description: 'Happy',
  //     value: [0.4, 0.6],
  //   },
  //   {
  //     emoji: `🤩`,
  //     description: 'Excited',
  //     value: [0.6, 0.8],
  //   },
  //   {
  //     emoji: `🥳`,
  //     description: 'Very Excited',
  //     value: [0.8, 1],
  //   },
  // ];
  const handleNext = () => {
    if (receivedPercent) {
      dispatch(setValence(receivedPercent));
    } else {
      dispatch(setValence(0));
    }
    navigation.navigate('SeedInstrumentalness');
  };
  console.log(receivedPercent);
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
          marginHorizontal: 20,
          justifyContent: 'center',
        }}>
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
                  😔
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    marginTop: 15,
                    color: 'black',
                  }}>
                  Sad
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
                  😕
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    marginTop: 15,
                    color: 'black',
                  }}>
                  Neutral
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
                  😊
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    marginTop: 15,
                    color: 'black',
                  }}>
                  Happy
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
                  🤩
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    marginTop: 15,
                    color: 'black',
                  }}>
                  Excited
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
                  🥳
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    marginTop: 15,
                    color: 'black',
                  }}>
                  Very Excited
                </Text>
              </>
            )}
          </View>
          <Slider
            value={receivedPercent}
            onValueChange={setReceivedPercent}
            style={{width: '90%', height: 60, position: 'absolute', bottom: 0}}
            minimumTrackTintColor="#FFD700"
            maximumTrackTintColor="#000000"
          />
        </View>
        {/* {valences.map(valence => (
          <TouchableOpacity
            style={{
              marginVertical: 10,
              padding: 15,
              backgroundColor: 'white',
              elevation: 2,
              borderRadius: 5,
            }}
            onPress={() => (
              setSelectedValence(valence.description),
              setReceivedPercent(valence.value)
            )}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              {valence.emoji} {'  '} {valence.description}
            </Text>
          </TouchableOpacity>
        ))}
        <Text>{selectedValence}</Text> */}
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
