import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import Login from './screens/Login';
import Home from './screens/Home';
import {setLogin} from './redux/actions/userActions';
import GeneratePlaylist from './screens/GeneratePlaylist';

const Stack = createNativeStackNavigator();

const Router = () => {
  const accessToken = useSelector(state => state?.userReducer.accessToken);
  const dispatch = useDispatch();
  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const expire = await AsyncStorage.getItem('expiresIn');
      if (token !== null) {
        // Giriş işlemi başarılı ise, onLogin action'ını çağırın ve accessToken ve expiresIn değerlerini gönderin
        dispatch(setLogin(token, expire));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessToken();
    setInterval(() => {
      getAccessToken();
    }, 3500000);
  }, []);

  return (
    <NavigationContainer>
      {accessToken !== undefined ? (
        <Stack.Navigator>
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Generate Playlist"
              component={GeneratePlaylist}
            />
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
    </NavigationContainer>
  );
};

export default Router;
