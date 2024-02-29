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

const CreateAccount: React.FC = ({navigation}: any) => {
  type UserDetails = {
    username: string;
    email: string;
    password: string;
    reenterPassword: string;
  };
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: '',
    email: '',
    password: '',
    reenterPassword: '',
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
      await AsyncStorage.setItem('userData', JSON.stringify(userDetails));
      //   navigation.navigate('Login');
    } catch (e) {
      console.log(e);
    }
  };
  const isPasswordValid = (password: string) => {
    // Define the password validation regular expressions
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
    if (
      !userDetails.username &&
      !userDetails.email &&
      !userDetails.password &&
      !userDetails.reenterPassword
    ) {
      Alert.alert('Something went wrong', 'Fields should not be empty');
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
    } else if (!userDetails.email.match(/\S+@\S+\.+\S/)) {
      Alert.alert('Something went wrong', 'Please enter valid email address');
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
    } else if (userDetails.password !== userDetails.reenterPassword) {
      Alert.alert('Something went wrong', 'Password did not match');
      isValid = false;
    }
    if (isValid) {
      getData();
      navigation.navigate('Login');
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
        placeholder="email"
        style={styles.textInput}
        onChangeText={e => handleUserDetails('email', e)}
      />
      <TextInput
        placeholder="password"
        style={styles.textInput}
        onChangeText={e => handleUserDetails('password', e)}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="re-enter password"
        style={styles.textInput}
        onChangeText={e => handleUserDetails('reenterPassword', e)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleValidation}>
        <Text style={styles.buttonText}>Sign-In</Text>
      </TouchableOpacity>
      <View style={styles.signIn}>
        <Text>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default CreateAccount;

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
    padding: 8,
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
