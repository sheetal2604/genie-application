import React, {useMemo, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import CartProducts from '../components/CartProducts';
import {useAppDispatch} from '../redux/appHooks';
import {clearItem} from '../redux/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addOrderItem} from '../redux/orderSlice';
import ImageComponent from '../utils/ImageComponent';

const Cart: React.FC = ({navigation}: any) => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useAppDispatch();
  // const orderData = useAppSelector(state => state.order.orderData);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getCartItems();
  }, []);
  const getCartItems = async () => {
    try {
      let cartData;
      const data = await AsyncStorage.getItem('cartItems');
      if (data != null) {
        cartData = await JSON.parse(data);
        setCartItems(cartData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);
  const confirmHandlerAlert = () =>
    Alert.alert('Confirm ', 'Are you sure you want to checkout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: handleOrder},
    ]);

  function getRandomOrderStatus() {
    const orderStatuses = [
      'Received',
      'Packing',
      'In-Transit',
      'Delivered',
      'Cancelled',
    ];
    const randomIndex = Math.floor(Math.random() * orderStatuses.length);
    const randomOrderStatus = orderStatuses[randomIndex];
    return randomOrderStatus;
  }
  function getRandomDate() {
    const date = ['2024-02-24', '2024-01-18', '2024-01-13', '2024-02-26'];
    const randomIndex = Math.floor(Math.random() * date.length);
    const randomDate = date[randomIndex];
    return randomDate;
  }

  const handleOrder = async () => {
    try {
      const newOrderData = {
        totalPrice: totalPrice,
        orderId: Math.floor(Math.random() * 10000),
        orderDate: getRandomDate(),
        trackingStatus: getRandomOrderStatus(),
      };
      const existingOrdersString = await AsyncStorage.getItem('orders');
      const existingOrders = existingOrdersString
        ? JSON.parse(existingOrdersString)
        : [];
      const updatedOrders = Array.isArray(existingOrders)
        ? [...existingOrders, newOrderData]
        : [newOrderData];
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
      dispatch(addOrderItem(newOrderData));
      setModalVisible(!modalVisible);
      await AsyncStorage.removeItem('cartItems');
      dispatch(clearItem());
    } catch (e) {
      console.log(e);
    }
  };
  const handleModalConfirmation = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Drawer');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Shopping Cart</Text>
      </View>

      {cartItems.length === 0 && (
        <View style={styles.inner}>
          <Text style={styles.cartText}>Your cart is Empty!!</Text>
        </View>
      )}
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
                <ImageComponent
                  url={require('../assets/green-tick.png')}
                  style={styles.icon}
                />
                <Text style={styles.modalText}>
                  Your Order has been placed successfully!{' '}
                </Text>
                <Pressable
                  onPress={handleModalConfirmation}
                  style={styles.modalButton}>
                  <Text style={styles.buttonText}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
      <FlatList
        data={cartItems}
        renderItem={itemData => <CartProducts item={itemData.item} />}
        contentContainerStyle={styles.listContent}
      />
      {cartItems.length > 0 && (
        <>
          <View style={styles.footer}>
            <Text style={styles.price}>Total Price - ${totalPrice}</Text>
          </View>
          <TouchableOpacity
            style={styles.footerOne}
            onPress={confirmHandlerAlert}>
            <Text style={styles.price}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
    padding: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerOne: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    backgroundColor: '#ffa366',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  listContent: {
    paddingBottom: 200,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    fontSize: 18,
    color: 'black',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
