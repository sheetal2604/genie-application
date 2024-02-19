import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageComponent from '../utils/ImageComponent';

type PropTypes = {
  rating: number;
};
const Rating: React.FC<PropTypes> = ({rating}: PropTypes) => {
  const maxRating = 5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      const starIconName =
        i <= Math.round(rating) ? (
          <ImageComponent
            key={`star-${i}`}
            url={require('../assets/filled-star.png')}
            style={styles.images}
          />
        ) : (
          <ImageComponent
            key={`star-${i}`}
            url={require('../assets/outline-star.png')}
            style={styles.images}
          />
        );
      stars.push(starIconName);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {renderStars()}
      <Text style={styles.ratingText}>{rating}/5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#888',
  },
  images: {
    height: 20,
    width: 20,
  },
});

export default Rating;
