import React, {useLayoutEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Rating from './Rating';

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
const Product: React.FC<{item: PropTypes}> = ({item}) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.category,
    });
  }, [item.category, navigation]);
  const originalPrice = Math.round(
    item.price / (1 - item.discountPercentage / 100),
  );
  const handleProductDetails = (item: PropTypes) => {
    navigation.navigate('ProductDetails', {
      item,
    });
  };
  return (
    <TouchableOpacity
      style={styles.outer}
      onPress={() => handleProductDetails(item)}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.thumbnail}} style={styles.image} />
      </View>
      <View style={styles.innerOne}>
        <Text style={styles.text}>{item.title}</Text>
        <View style={styles.pricingDetails}>
          <Text style={styles.text}>${item.price}</Text>
          <Text style={styles.originalPrice}>{originalPrice}</Text>
          <Text style={styles.discount}>{item.discountPercentage}% off</Text>
        </View>
        <Rating rating={item.rating} />
      </View>
    </TouchableOpacity>
  );
};
export default Product;

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
});
