import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
type PropTypes = {
  totalPrice: number;
  orderId: number;
  orderDate: string;
  trackingStatus: string;
};
const OrderDetails: React.FC<{item: PropTypes}> = ({item}) => {
  let textColor;
  if (item.trackingStatus === 'Delivered') {
    textColor = styles.greenText;
  } else if (item.trackingStatus === 'Cancelled') {
    textColor = styles.redText;
  } else if (
    item.trackingStatus === 'Received' ||
    item.trackingStatus === 'Packing' ||
    item.trackingStatus === 'In-Transit'
  ) {
    textColor = styles.orangeText;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerOne}>
        <Text style={styles.text}>OrderId: #{item.orderId}</Text>
        <Text style={styles.text}>Price: ${item.totalPrice}</Text>
      </View>
      <View style={styles.containerOne}>
        <Text style={styles.text}>{item.orderDate}</Text>
        <Text style={[styles.text, textColor]}>{item.trackingStatus}</Text>
      </View>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  greenText: {
    color: 'green',
    fontWeight: '500',
  },
  redText: {
    color: 'red',
    fontWeight: '500',
  },
  orangeText: {
    color: 'orange',
    fontWeight: '500',
  },
});
