import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login: React.FC = ({navigation}: any) => {
  type UserDetails = {
    username: string;
    password: string;
  };
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: '',
    password: '',
  });
  const handleUserDetails = (key: string, enteredText: string) => {
    setUserDetails(prev => {
      return {
        ...prev,
        [key]: enteredText,
      };
    });
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue !== null) {
        let jsonData = await JSON.parse(jsonValue);
        if (
          jsonData.username === userDetails.username &&
          jsonData.password === userDetails.password
        ) {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          navigation.navigate('Drawer');
          let data = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: 'kminchelle',
              password: '0lelplR',
            }),
          });
          let res = await data.json();
          console.log(res.token);
        } else {
          Alert.alert('Something went wrong', 'Invalid Credentials');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isPasswordValid = (password: string) => {
    const minLengthRegex = /.{7,}/;
    const capitalLetterRegex = /[A-Z]/;
    const numberRegex = /\d/;
    return (
      minLengthRegex.test(password) &&
      capitalLetterRegex.test(password) &&
      numberRegex.test(password)
    );
  };
  const handleValidation = () => {
    let isValid = true;
    if (!userDetails.username && !userDetails.password) {
      Alert.alert(
        'Something went wrong',
        'Please enter your username and password',
      );
      isValid = false;
    } else if (!userDetails.username) {
      Alert.alert('Something went wrong', 'Please enter your username');
      isValid = false;
    } else if (userDetails.username.length < 7) {
      Alert.alert(
        'Something went wrong',
        'username length should be greater than 7',
      );
      isValid = false;
    } else if (!userDetails.password) {
      Alert.alert('Something went wrong', 'Please enter your password');
      isValid = false;
    } else if (!isPasswordValid(userDetails.password)) {
      Alert.alert(
        'Something went wrong',
        'The password length should be greater than 6, with 1 capital letter, 1 number ',
      );
      isValid = false;
    }
    if (isValid) {
      getData();
    }
  };
  return (
    <View style={styles.outerContainer}>
      <Image
        source={require('../assets/genie-logo.png')}
        style={styles.images}
      />
      <TextInput
        placeholder="username"
        style={styles.textInput}
        onChangeText={e => handleUserDetails('username', e)}
      />
      <TextInput
        placeholder="password"
        style={styles.textInput}
        onChangeText={e => handleUserDetails('password', e)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleValidation}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.signIn}>
        <Text>
          New to Genie?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('CreateAccount')}>
            Create a new account
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  images: {
    height: 180,
    width: 180,
  },
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    width: 300,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 19,
  },
  button: {
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 5,
    width: 180,
    height: 46,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 19,
    paddingVertical: 8,
  },
  signIn: {
    marginTop: 15,
  },
  link: {
    color: '#2470bd',
  },
});
