import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Router = () => {
  const accessToken = useSelector(state => state?.authSlice?.accessToken);

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        {accessToken !== null ? (
          <Stack.Navigator>
            <Stack.Group
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Group>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Group
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
          </Stack.Navigator>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Router;
