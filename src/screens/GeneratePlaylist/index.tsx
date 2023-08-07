import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SeedArtist from './SeedArtist';
import SeedTrack from './SeedTrack';
import React from 'react';

const Stack = createNativeStackNavigator();

function GeneratePlaylist() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SeedArtist" component={SeedArtist} />
      <Stack.Screen name="SeedTrack" component={SeedTrack} />
    </Stack.Navigator>
  );
}

export default GeneratePlaylist;
