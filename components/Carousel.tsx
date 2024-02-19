import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/appHooks';
import {AllCategoryDetails} from '../redux/categorySlice';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AllProductDetails} from '../redux/productSlice';

const Carousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(AllCategoryDetails());
  }, [dispatch]);
  const handleProducts = async ({title}: ItemProps) => {
    await dispatch(AllProductDetails({title}));
    navigation.navigate('ProductList');
  };
  const categories = useAppSelector(state => state.category.categoryData);
  type ItemProps = {title: string};
  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = ({title}: ItemProps) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleProducts({title})}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>FEATURED PRODUCTS</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={categories}
          renderItem={({item}) => <Item title={item.toString()} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    </View>
  );
};
export default Carousel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#d6f5f5',
    borderColor: '#d6f5f5',
    height: '40%',
    marginTop: 60,
    paddingHorizontal: 10,
  },
  item: {
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#9F70FD',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 40,
    marginRight: 10,
    height: 200,
    width: 150,
  },
  text: {
    paddingVertical: 70,
    textAlign: 'center',
    fontSize: 15,
    color: '#000000',
  },
  title: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 10,
    flexGrow: 1,
  },
  titleBox: {
    marginTop: 30,
  },
});
