import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {handleLogin} from '../../utils/onLogin';
import styles from './styles';

const Login = () => {
  return (
    <ImageBackground
      imageStyle={styles.imageStyle}
      style={styles.container}
      source={{
        uri: 'https://images.unsplash.com/photo-1502773860571-211a597d6e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Rhythm Radar</Text>
        <Text style={styles.slogan}>
          Get Ready for a Rhythm Journey with Rhythm Radar! Are You Ready to
          Explore and Dance?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.92}
          style={styles.button}>
          <Text style={styles.buttonText}>Login with Spotify</Text>
        </TouchableOpacity>

        <Text style={styles.explanationText}>Why do we need to Spotify</Text>
      </View>
    </ImageBackground>
  );
};

export default Login;
