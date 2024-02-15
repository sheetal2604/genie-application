import React from 'react';
import Orders from '../screens/Orders';
import {createDrawerNavigator} from '@react-navigation/drawer';
export type DrawerRootParamList = {
  Orders: undefined;
};

const NavigationDrawer: React.FC = () => {
  const Drawer = createDrawerNavigator<DrawerRootParamList>();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default NavigationDrawer;
