import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Banner: React.FC = () => {
  type Details = {
    firstName: string;
    email: string;
  };
  const [userDetails, setUserDetails] = useState<Details>();
  useEffect(() => {
    getUserDetails();
  }, []);
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
    <View style={styles.outer}>
      <Text style={styles.text}>Welcome, {userDetails?.firstName}</Text>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  outer: {
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d6f5f5',
    marginHorizontal: 40,
    padding: 16,
    backgroundColor: '#d6f5f5',
    color: 'black',
  },
  text: {
    color: 'black',
  },
});
