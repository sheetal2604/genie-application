import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from '../screens/Login';
import Home from '../screens/Home';
import ProductList from '../screens/ProductList';
import RightMenuBar from '../components/RightMenuBar';
import Cart from '../screens/Cart';
import ProductDetails from '../screens/ProductDetails';
// import NavigationDrawer from './NavigationDrawer';

export type StackRootParamList = {
  Login: undefined;
  Home: undefined;
  Drawer: undefined;
  ProductList: undefined;
  Cart: undefined;
  ProductDetails: undefined;
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
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={({navigation}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <>
              <RightMenuBar
                isCartShown={true}
                onPress={() => navigation.navigate('Cart')}
              />
            </>
          ),
        })}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({navigation}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <>
              <RightMenuBar
                isCartShown={true}
                onPress={() => navigation.navigate('Cart')}
              />
            </>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;
