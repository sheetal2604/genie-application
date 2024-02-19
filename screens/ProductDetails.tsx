import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ProductDetails: React.FC = ({route}: any) => {
  const {item} = route.params;
  const imageArray = item.images;
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
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>${item.price}</Text>
      </View>
      <View style={styles.innerTwo}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
        <Text style={styles.button}>1</Text>
        <TouchableOpacity>
          <Text style={styles.button}>+</Text>
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
  },
  button: {
    fontSize: 20,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
});
