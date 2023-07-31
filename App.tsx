import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (token !== null) {
        setAccessToken(token);
        setRefreshToken(refreshToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  const Stack = createNativeStackNavigator();
  console.log(accessToken);

  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default App;
