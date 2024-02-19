/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './navigators/NavigationStack';
import {Provider} from 'react-redux';
import {appStore} from './redux/appStore';

function App(): React.JSX.Element {
  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
