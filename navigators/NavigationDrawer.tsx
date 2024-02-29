/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import Orders from '../screens/Orders';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import ManageAccount from '../screens/ManageAccount';
import {useAppDispatch} from '../redux/appHooks';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageComponent from '../utils/ImageComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearItem} from '../redux/cartSlice';
export type DrawerRootParamList = {
  Orders: undefined;
  Home: undefined;
  Profile: undefined;
  Logout: undefined;
};

const CustomDrawerContent = ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const handleModalConfirmation = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('cartItems');
      dispatch(clearItem());
      await AsyncStorage.removeItem('orders');
    } catch (e) {
      console.log(e);
    }
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView style={modalVisible ? styles.blur : null}>
      <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} />
      <DrawerItem
        label="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Orders"
        onPress={() => navigation.navigate('Orders')}
      />
      <View style={styles.logoutButton}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={modalVisible ? styles.blurButton : styles.button}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
        {modalVisible && (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalContainerOne}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Are you sure you want to logout?{' '}
                  </Text>
                  <Pressable
                    onPress={handleModalConfirmation}
                    style={styles.modalButton}>
                    <Text style={styles.buttonText}>Logout</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.modalButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const NavigationDrawer: React.FC = () => {
  const Drawer = createDrawerNavigator<DrawerRootParamList>();

  return (
    <Drawer.Navigator
      screenOptions={{drawerPosition: 'right'}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={ManageAccount}
        options={{
          drawerPosition: 'left',
          headerRight: () => (
            <ImageComponent
              url={require('../assets/genie-logo.png')}
              style={styles.images}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          drawerPosition: 'left',
          headerRight: () => (
            <ImageComponent
              url={require('../assets/genie-logo.png')}
              style={styles.images}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default NavigationDrawer;

const styles = StyleSheet.create({
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ffa366',
    borderWidth: 1,
    borderColor: '#ffa366',
    width: '80%',
    height: 30,
    borderRadius: 8,
  },
  blurButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '80%',
    height: 30,
    borderRadius: 8,
  },
  logout: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  images: {
    height: 60,
    width: 60,
    marginHorizontal: 10,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerOne: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 350,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    height: 50,
    width: 50,
  },
  modalText: {
    marginTop: 5,
    fontSize: 17,
    color: 'black',
  },
  modalButton: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 15,
    width: 70,

    borderColor: '#ffa366',
    backgroundColor: '#ffa366',
  },
  buttonText: {
    fontSize: 17,
    color: 'black',
    padding: 5,
    textAlign: 'center',
  },
  blur: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
