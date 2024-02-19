import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageComponent from '../utils/ImageComponent';
// import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

const MenuBar: React.FC = () => {
  // const navigation = useNavigation();
  // const openProfileDrawer = () => {
  //   navigation.navigate('Drawer');
  // };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <ImageComponent
          url={require('../assets/genie-logo.png')}
          style={styles.images}
        />
      </View>
      <View style={styles.innerContainerTwo}>
        <ImageComponent
          url={require('../assets/cart-icon.png')}
          style={styles.cartIcon}
        />
        <ImageComponent
          url={require('../assets/location-icon.png')}
          style={styles.locationIcon}
        />
      </View>
      <View>
        <Text>Location</Text>
        <Text>PinCode</Text>
      </View>
      <TouchableOpacity>
        <ImageComponent
          url={require('../assets/user.png')}
          style={styles.userIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
export default MenuBar;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    height: 70,
    borderColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 6,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  innerContainerTwo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  images: {
    height: 60,
    width: 60,
    marginHorizontal: 10,
  },
  cartIcon: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },
  locationIcon: {
    height: 35,
    width: 20,
    marginHorizontal: 10,
  },
  userIcon: {
    height: 30,
    width: 30,
  },
});
