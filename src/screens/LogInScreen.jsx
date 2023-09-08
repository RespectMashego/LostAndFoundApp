import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import AuthErrorModal from '../components/AuthErrorModal';
import axios from 'axios';
import { setItem } from '../util/asyncStorage';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNavigateToSignUpScreen = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleLogIn = async () => {
    setLoading(!loading);
    Keyboard.dismiss();
    try {
      if (!email || !password) {
        Alert.alert('Please fill all fields');
        return;
      }
      const respond = await axios.post(
        'http://192.168.74.44:3000/auth/login', // Replace with your login endpoint
        {
          email,
          password,
        }
      );
      if (respond.status === 200) {
        console.log('User login was successful');
        const { user, token } = respond.data;
        console.log(user?.username);
        console.log(`user:${user},token:${token}`);
        dispatch(setUser({ user, token }));
        setItem('user', JSON.stringify(user));
        setItem('token', token);
      } else {
        console.error('Login failed with status', respond.status);
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      if(error.response && error.response.status === 404){
        setErrorMessage(error.response.data.message);
        console.error("user not found")
        setModalVisible(true);

      }
      if (error.response && error.response.status === 401) {
        console.log('Invalid email or password');
        console.log('Data from response object', error.response.data);
        setModalVisible(true);
        setErrorMessage(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: 'white' }}
      className="bg-primary-white flex-1 justify-center items-center">
      <AuthErrorModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        errorMessage={errorMessage}
      />
      <Loader loading={loading} />
      <View className="flex-row justify-between items-center w-full p-3 absolute top-0">
        <TouchableOpacity onPress={handleNavigateToSignUpScreen}>
          <AntDesign name="arrowleft" size={30} color={'#000'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogIn}
          className="  border-[1.3px] border-primary-lightGrey rounded-3xl justify-center items-center">
          <Text className="px-3 py-2 text-primary-black">Log In</Text>
        </TouchableOpacity>
      </View>

      <View className=" flex-1 justify-center items-center w-[90%] mt-10 ">
        <View className="justify-center items-center mb-8 mt-[20px]">
          <Image
            className="h-40 w-40 rounded-full"
            source={require('../assets/images/lostFoundLogo.jpg')}
          />
        </View>
        <View>
          <Text className="font-semibold text-[20px] text-center text mb-16">
            Log In to Your Account
          </Text>
        </View>
        <TextInput
          className="border border-primary-lightGrey rounded-full h-50 w-full px-5 "
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View className="border border-primary-lightGrey rounded-full h-50 w-full px-5 mt-4 flex-row items-center ">
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="absolute right-5"
            onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-x-5 mt-4 justify-between items-center">
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={handleNavigateToSignUpScreen}>
            <Text className="text-primary-blue font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogIn}
        className="  bg-primary-blue rounded-full  justify-center items-center w-[90%]  mx-auto mb-4 shadow-primary-black">
        <Text style={{ color: 'white' }} className="text-primary-white py-4 font-medium ">
          Log In
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LogInScreen;
