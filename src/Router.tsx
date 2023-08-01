import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from './redux/authSlicer';

const Stack = createNativeStackNavigator();

const Router = () => {
  const accessToken = useSelector(state => state?.authSlicer?.accessToken);
  const dispatch = useDispatch();
  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const refToken = await AsyncStorage.getItem('refreshToken');
      if (token !== null) {
        const data = {
          accessToken: token,
          refreshToken: refToken,
          error: false,
        };
        dispatch(setLogin(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        {accessToken !== undefined ? (
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
