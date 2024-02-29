import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
const Banner: React.FC = () => {
  type Details = {
    username: string;
  };
  const [userDetails, setUserDetails] = useState<Details>();
  useFocusEffect(
    useCallback(() => {
      getUserDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
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
  const formattedStr = (user: Details | undefined) => {
    const str = user?.username;
    if (str) {
      return str?.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };
  return (
    <View style={styles.outer}>
      <Text style={styles.text}>Welcome, {formattedStr(userDetails)}!</Text>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  outer: {
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffd1b3',
    marginHorizontal: 40,
    padding: 16,
    backgroundColor: '#ffd1b3',
    color: 'black',
    height: 80,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: 19,
  },
});
