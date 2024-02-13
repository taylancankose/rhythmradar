import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';

interface percentProps {
  receivedPercent: number;
  setReceivedPercent: () => void;
}

const SliderComp = ({value, onValueChange}: percentProps) => {
  return (
    <Slider
      style={{width: '90%', height: 60, position: 'absolute', bottom: 0}}
      minimumTrackTintColor="#FFD700"
      maximumTrackTintColor="#000000"
      value={value}
      onValueChange={onValueChange}
    />
  );
};

export default SliderComp;
