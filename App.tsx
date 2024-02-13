import React from 'react';
import {Provider} from 'react-redux';
import Router from './src/Router';
import store from './src/redux/store';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

/* 
COLORS
#8783D1
#FFC09F
#FFEE93
#FCF5C7
#ADF7B6
*/

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
