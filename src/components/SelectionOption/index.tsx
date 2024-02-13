import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

const SelectOption = ({
  option,
  emoji,
  text,
  setSelectedOption,
  selectedOption,
}) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedOption(option)}
      style={[
        styles.container,
        selectedOption === option
          ? {
              backgroundColor: '#FFD700',
            }
          : {backgroundColor: '#E3FFDA'},
      ]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SelectOption;
