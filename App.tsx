import React from 'react';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import Router from './src/Router';

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
