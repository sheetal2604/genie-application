import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

type Details = {
  username: string;
  email: string;
  password: string;
  reenterPassword: string;
};
type UserImage = {
  path: string;
};
const ManageAccount: React.FC = ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState<Details>({
    username: '',
    email: '',
    password: '',
    reenterPassword: '',
  });
  // useEffect(() => {

  // }, []);
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      getUserData();
      getImagePath();
    });
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);
  const getUserData = async () => {
    let data;
    try {
      data = await AsyncStorage.getItem('userData');
      if (data != null) {
        const res = await JSON.parse(data);
        console.log(res, 'userData');
        setUserData(res);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [imagePath, setImagePath] = useState<UserImage>({
    path: '',
  });
  const getImagePath = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data != null) {
        const res = await JSON.parse(data);
        setImagePath({path: res.imagePath || ''});
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImagePath({path: image.path});
    });
    setModalVisible(false);
  };
  const handleGalleryImages = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImagePath({path: image.path});
    });
    setModalVisible(false);
  };
  const handleUsername = (key: string, enteredText: string) => {
    setUserData(prev => {
      return {
        ...prev,
        [key]: enteredText,
      };
    });
  };
  const handleUserChanges = async () => {
    try {
      const updatedUserData = {...userData, imagePath: imagePath.path};
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      // const updated = await AsyncStorage.getItem('userData');
      // if (updated !== null) {
      //   const res = JSON.parse(updated);
      //   console.log(res, 'res');
      //   setImagePath({path: res.imagePath});
      // }
      Alert.alert('Success', 'User details updated successfully');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView style={modalVisible ? styles.blur : null}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <View style={styles.view}>
          <Image
            source={
              imagePath.path
                ? {uri: imagePath.path}
                : require('../assets/user.png')
            }
            style={styles.image}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <View style={styles.modalText}>
              <View style={styles.modalText}>
                <Text style={styles.photoText}>Upload Photo</Text>
                <Text>Choose your profile picture</Text>
              </View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCamera}>
                <Text style={styles.modalButtonText}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleGalleryImages}>
                <Text style={styles.modalButtonText}>Import from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.link}>Change profile photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Full Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={e => handleUsername('username', e)}>
          {userData?.username}
        </TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleUserChanges}>
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ManageAccount;

const styles = StyleSheet.create({
  view: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    height: 200,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  textContainer: {
    marginBottom: 8,
    padding: 6,
  },
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    padding: 8,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  saveButton: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: '50%',
    height: 40,
    backgroundColor: '#ffa366',
    borderColor: '#ffa366',
  },
  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    padding: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 5,
    fontSize: 13,
    color: '#2470bd',
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    height: 250,
    width: '100%',
    borderRadius: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  modalText: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButton: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#ffa366',
    backgroundColor: '#ffa366',
    width: '80%',
    marginHorizontal: 20,
    padding: 10,
    marginTop: 10,
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  blur: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
});
