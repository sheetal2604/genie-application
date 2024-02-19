import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ImageComponent from '../utils/ImageComponent';

type PropTypes = {
  isCartShown?: boolean;
  onPress?: () => void;
};
const RightMenuBar: React.FC<PropTypes> = ({isCartShown, onPress}) => {
  return (
    <>
      {isCartShown ? (
        <>
          <TouchableOpacity onPress={onPress}>
            <ImageComponent
              url={require('../assets/cart-icon.png')}
              style={styles.cartIcon}
            />
          </TouchableOpacity>
          <ImageComponent
            url={require('../assets/genie-logo.png')}
            style={styles.images}
          />
        </>
      ) : (
        <ImageComponent
          url={require('../assets/genie-logo.png')}
          style={styles.images}
        />
      )}
    </>
  );
};

export default RightMenuBar;

const styles = StyleSheet.create({
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
});
