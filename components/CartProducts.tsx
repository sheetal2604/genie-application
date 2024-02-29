import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

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
  quantity: number;
};
const CartProducts: React.FC<{item: PropTypes}> = ({item}) => {
  return (
    <SafeAreaView style={styles.outer}>
      <View>
        <Image source={{uri: item.thumbnail}} style={styles.image} />
      </View>
      <View style={styles.innerOne}>
        <Text style={styles.text}>{item.title}</Text>
        <View style={styles.pricingDetails}>
          <View style={styles.price}>
            <Text style={styles.text}>${item.price * item.quantity}</Text>
          </View>
          <View style={styles.qty}>
            <Text style={styles.textQty}>Qty- {item.quantity}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartProducts;

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  image: {
    height: 150,
    width: 150,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  innerOne: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 10,
  },
  innerTwo: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 30,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingRight: 10,
  },
  pricingDetails: {
    flexDirection: 'row',
    marginTop: 15,
  },
  originalPrice: {
    marginBottom: 10,
    paddingHorizontal: 8,
    fontSize: 17,
    textDecorationLine: 'line-through',
  },
  discount: {
    color: 'red',
    marginBottom: 10,
    fontSize: 17,
  },
  textQty: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qty: {
    marginLeft: 60,
  },
  price: {
    width: '40%',
  },
});
