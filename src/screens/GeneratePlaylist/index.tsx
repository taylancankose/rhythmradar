import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SeedInstrumentalness from './SeedInstrumentalness';
import SeedValence from './SeedValence';
import SeedEnergy from './SeedEnergy';
import SeedArtist from './SeedArtist';
import SeedGenre from './SeedGenre';
import SeedTrack from './SeedTrack';
import React from 'react';
import Playlist from './Playlist';
import Selection from './Selection';
import PlaylistName from './PlaylistName';

const Stack = createNativeStackNavigator();

function GeneratePlaylist() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Selection" component={Selection} />
      <Stack.Screen name="PlaylistName" component={PlaylistName} />
      <Stack.Screen name="SeedArtist" component={SeedArtist} />
      <Stack.Screen name="SeedTrack" component={SeedTrack} />
      <Stack.Screen name="SeedGenre" component={SeedGenre} />
      <Stack.Screen name="SeedValence" component={SeedValence} />
      <Stack.Screen
        name="SeedInstrumentalness"
        component={SeedInstrumentalness}
      />
      <Stack.Screen name="SeedEnergy" component={SeedEnergy} />
      <Stack.Screen name="Playlist" component={Playlist} />
    </Stack.Navigator>
  );
}

export default GeneratePlaylist;
