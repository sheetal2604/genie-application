import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import OrderDetails from '../components/OrderDetails';
import {StyleSheet} from 'react-native';

type Orders = {
  totalPrice: number;
  orderId: number;
  orderDate: string;
  trackingStatus: string;
};
const Orders: React.FC = ({navigation}: any) => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const getOrderDetails = async () => {
    try {
      const data = await AsyncStorage.getItem('orders');
      if (data != null) {
        const res = await JSON.parse(data);
        setOrders(res);
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      getOrderDetails();
    });
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      {orders.length === 0 && (
        <View style={styles.order}>
          <Text style={styles.text}>No Orders</Text>
        </View>
      )}
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId.toString()}
        renderItem={({item}) => {
          return <OrderDetails item={item} />;
        }}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    marginBottom: 60,
  },
  order: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
});
