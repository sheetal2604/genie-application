import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from '../screens/Login';
import Home from '../screens/Home';
// import NavigationDrawer from './NavigationDrawer';

export type StackRootParamList = {
  Login: undefined;
  Home: undefined;
  Drawer: undefined;
};

const NavigationStack: React.FC = () => {
  const Stack = createNativeStackNavigator<StackRootParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Drawer" component={NavigationDrawer} /> */}
    </Stack.Navigator>
  );
};

export default NavigationStack;
