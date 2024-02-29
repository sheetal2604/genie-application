import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/appHooks';
import {AllCategoryDetails} from '../redux/categorySlice';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AllProductDetails} from '../redux/productSlice';
import {StackRootParamList} from '../navigators/NavigationStack';

const Carousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation: NavigationProp<StackRootParamList> = useNavigation();
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
    backgroundColor: '#ffd1b3',
    borderColor: '#ffd1b3',
    height: '40%',
    marginTop: 60,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  item: {
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#9F70FD',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 40,
    marginRight: 24,
    height: 200,
    width: 95,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    paddingVertical: 70,
    textAlign: 'center',
    fontSize: 12,
    color: '#000000',
    fontWeight: '600',
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
    marginTop: 40,
  },
});
