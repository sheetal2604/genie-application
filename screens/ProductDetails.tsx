import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from '../redux/appHooks';
import {useAppSelector} from '../redux/appHooks';
import {addItem, decrementQuantity} from '../redux/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProductDetails: React.FC = ({route}: any) => {
  const {item} = route.params?.params || {};
  const imageArray = item?.images;
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.cart.cartData);
  const cartItem = products.find(product => product.title === item.title);
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(products));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    storeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const handleDecrementProducts = () => {
    dispatch(decrementQuantity({title: item.title}));
  };
  const handleIncrementProducts = () => {
    dispatch(addItem(item));
  };
  return (
    <View style={styles.outer}>
      <View>
        <FlatList
          data={imageArray}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          renderItem={({item}) => (
            <Image source={{uri: item}} style={styles.image} />
          )}
          horizontal={true}
          pagingEnabled={true}
          snapToInterval={Dimensions.get('window').width + 10}
        />
      </View>
      <View style={styles.inner}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.title}>${item?.price}</Text>
      </View>
      <View style={styles.innerTwo}>
        <Text style={styles.description}>{item?.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleDecrementProducts}
          style={styles.buttonOne}>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
        <Text style={styles.button}>{cartItem ? cartItem.quantity : 0}</Text>
        <TouchableOpacity onPress={handleIncrementProducts}>
          <Text style={styles.buttonTwo}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
const styles = StyleSheet.create({
  image: {
    height: 400,
    width: 300,
  },
  outer: {
    marginTop: 20,
    marginHorizontal: 50,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  innerTwo: {
    marginTop: 10,
  },
  description: {
    fontSize: 17,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 210,
    borderRadius: 6,
    padding: 8,
  },
  button: {
    fontSize: 20,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  buttonOne: {
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  buttonTwo: {
    fontSize: 20,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
});
