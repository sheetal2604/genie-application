import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from '../screens/Login';
import ProductList from '../screens/ProductList';
import RightMenuBar from '../components/RightMenuBar';
import Cart from '../screens/Cart';
import ProductDetails from '../screens/ProductDetails';
import NavigationDrawer from './NavigationDrawer';
import CreateAccount from '../screens/CreateAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

type PropTypes = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: [];
  thumbnail: string;
};
export type StackRootParamList = {
  Login: undefined;
  Home: undefined;
  Drawer: undefined;
  ProductList: undefined;
  Cart: undefined;
  ProductDetails: {screen: string; params: {item: PropTypes}};
  CreateAccount: undefined;
};

const NavigationStack: React.FC = () => {
  const Stack = createNativeStackNavigator<StackRootParamList>();
  const [initialRoute, setInitialRoute] = useState<
    'Login' | 'Drawer' | 'loading'
  >('loading');
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      setInitialRoute(isLoggedIn === 'true' ? 'Drawer' : 'Login');
    } catch (e) {
      console.log(e);
    }
  };
  if (initialRoute === 'loading') {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
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
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <>
              <RightMenuBar isCartShown={false} />
            </>
          ),
          headerTitle: '',
        }}
      />
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
      <Stack.Screen
        name="Drawer"
        component={NavigationDrawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
