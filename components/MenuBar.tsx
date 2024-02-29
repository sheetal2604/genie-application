import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageComponent from '../utils/ImageComponent';
import {TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
  NavigationProp,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {apiKey, apiUrl} from '../utils/apikey';
import {StackRootParamList} from '../navigators/NavigationStack';

type Details = {
  username: string;
  imagePath: string;
};
type Coords = {
  latitude: number;
  longitude: number;
};
type Location = {
  city: '';
  postalCode: number;
};

const MenuBar: React.FC = () => {
  const navigation: NavigationProp<StackRootParamList> = useNavigation();
  const openProfileDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const [userDetails, setUserDetails] = useState<Details>();
  const [coords, setCoords] = useState<Coords>({
    latitude: 0,
    longitude: 0,
  });
  const [location, setLocation] = useState<Location>({
    city: '',
    postalCode: 0,
  });
  useFocusEffect(
    useCallback(() => {
      getUserDetails();
      Geolocation.getCurrentPosition(info =>
        setCoords({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }),
      );
    }, []),
  );

  useEffect(() => {
    getCityName(coords)
      .then(cityName => setLocation(cityName))
      .catch(error => console.error('Error:', error.message));
  }, [coords]);

  const getCityName = async (coordinates: Coords) => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          key: apiKey,
          q: `${coordinates.latitude},${coordinates.longitude}`,
        },
      });

      if (response.data.results.length > 0) {
        const city = response.data.results[0].components.city;
        const postalCode = response.data.results[0].components.postcode;
        return {
          city,
          postalCode,
        };
      } else {
        return {
          city: 'City not found',
          postalCode: 'Postal code not found',
        };
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      return {
        city: 'Error fetching city name',
        postalCode: 'Error fetching postal code',
      };
    }
  };

  const getUserDetails = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const parsedData: Details = JSON.parse(data);
        setUserDetails(parsedData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <ImageComponent
          url={require('../assets/genie-logo.png')}
          style={styles.images}
        />
      </View>
      <View style={styles.innerContainerTwo}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <ImageComponent
            url={require('../assets/cart-icon.png')}
            style={styles.cartIcon}
          />
        </TouchableOpacity>

        <ImageComponent
          url={require('../assets/location-icon.png')}
          style={styles.locationIcon}
        />
      </View>
      <View style={styles.city}>
        <Text style={styles.cityName}>{location.city}</Text>
        <Text style={styles.cityName}>{location.postalCode}</Text>
      </View>
      <TouchableOpacity onPress={openProfileDrawer}>
        <ImageComponent
          url={
            userDetails?.imagePath
              ? userDetails.imagePath
              : require('../assets/user.png')
          }
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
    marginLeft: 10,
  },
  userIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  city: {
    padding: 4,
    margin: 4,
  },
  cityName: {
    fontSize: 10,
  },
});
