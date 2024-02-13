import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

type propTypes = {
  title: string;
  onPress: () => void;
  color: string;
  width?: number | string | any;
  textColor: string;
  fontSize?: number;
  fontWeight?: string;
  disabled?: boolean;
  style?: object;
};

const Button = ({
  title,
  onPress,
  color,
  width,
  textColor,
  fontSize,
  fontWeight,
  disabled,
  style,
}: propTypes) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          width: width,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          {
            color: textColor,
            fontWeight: fontWeight,
            fontSize: fontSize,
          },
          style,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
