import React, {useState, useEffect} from 'react';
import {View, FlatList, TextInput, StyleSheet} from 'react-native';
import Product from '../components/Product';
import {useAppSelector} from '../redux/appHooks';

const ProductList: React.FC = () => {
  const products = useAppSelector(state => state.product.productData);
  const [searchText, setSearchText] = useState<string>('');
  const [filtered, setFiltered] = useState(products);
  const handleInput = (enteredValue: string) => {
    setSearchText(enteredValue);
  };

  useEffect(() => {
    filteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  const filteredProducts = () => {
    let filteredList = products;
    filteredList = filteredList.filter(list =>
      list.title.toLowerCase().includes(searchText),
    );
    setFiltered(filteredList);
  };

  return (
    <View>
      <TextInput
        placeholder="Search any products"
        style={styles.textInput}
        onChangeText={handleInput}
      />
      <FlatList
        data={filtered}
        renderItem={({item}) => {
          return <Product item={item} />;
        }}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    padding: 8,
    backgroundColor: 'white',
  },
  flatList: {
    paddingBottom: 80,
  },
});
