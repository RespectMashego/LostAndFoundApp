import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

//import { useSelector,useDispatch } from 'react-redux
//import { loginUser } from '../store/slices/userSlice';
import Loader from '../components/Loader';
import AuthErrorModal from '../components/AuthErrorModal';
import axios from 'axios';
import {setItem} from '../util/asyncStorage';
import {setUser} from '../redux/userSlice';
import {useDispatch} from 'react-redux';
import {baseUrl} from '../util/baseUrl';

const SignUpScreen = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const placeholderTextColor='#180D3D'

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleNavigateToLoginScreen = () => {
    navigation.navigate('LogInScreen');
  };

  const handleSignUp = async () => {
    setLoading(!loading);
    Keyboard.dismiss();
    try {
      if (!username || !email || !password) {
        Alert.alert('Please fill all fields');
        return;
      }
      const respond = await axios.post(`${baseUrl}/auth/register`, {
        username,
        email,
        password,
      });
      if (respond.status === 201) {
        console.log('User registration was successful');
        const {user, token} = respond.data;
        console.log(user?.username);
        console.log(`user:${user},token:${token}`);
        dispatch(setUser({user, token}));
        setItem('user', JSON.stringify(user));
        setItem('token', token);
      } else {
        console.error('Registration failed with status', respond.status);
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('User email already exists');
        console.log('Data from response object', error.response.data);
        setModalVisible(true);
        setErrorMessage(error.response.data.message);
        // Handle the situation where the email already exists
        // You might want to show an error message to the user
        // For example:
        // setError("Email already exists. Please use a different email or log in.");
      } else {
        console.error('User registration failed', error.message);
        setErrorMessage('Registration failed. Please try again.');
        setModalVisible(true);
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
      style={{backgroundColor: 'white'}}
      className="bg-primary-white flex-1 justify-center items-center  ">
      <KeyboardAvoidingView></KeyboardAvoidingView>
      <AuthErrorModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        errorMessage={errorMessage}
      />
      <Loader loading={loading} />
      <View className="flex-row justify-between items-center w-full p-3 absolute top-0 ">
        <TouchableOpacity onPress={handleNavigateBack}>
          <AntDesign name="arrowleft" size={30} color={'#000'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToLoginScreen}
          className=" bg-primary-blue  rounded-3xl justify-center items-center">
          <Text className="px-4 py-3 text-primary-white font-semibold">
            Log in
          </Text>
        </TouchableOpacity>
      </View>

      <View className=" flex-1 justify-center items-center w-[90%] mt-5 ">
        <View className="justify-center items-center mb-8 mt-[20px]">
          <Image
            className="h-40 w-40 rounded-full"
            source={require('../assets/images/lostFoundLogo.jpg')}
          />
        </View>
        <View>
          <Text className="font-semibold text-[20px] text-center text mb-5">
            Create your Account
          </Text>
        </View>
        <TextInput
          className="border border-primary-lightGrey rounded-full h-50 w-full px-5 "
          placeholder="Full Name"
          value={username}
          onChangeText={setUserName}
        />
        <TextInput
          className="border border-primary-lightGrey rounded-full h-50 w-full px-5 mt-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        {/* <TextInput
            className="border border-primary-lightGrey rounded-full h-50 w-full px-5  mt-4"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          /> */}

        <View className="border border-primary-lightGrey rounded-full h-50 w-full px-5  mt-4 flex-row items-center  ">
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
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={handleNavigateToLoginScreen}>
            <Text className="text-primary-blue font-medium">Log In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          className="  bg-primary-blue rounded-full  justify-center items-center w-[100%]  mt-10 mx-auto mb-4 shadow-primary-black">
          <Text
            style={{color: 'white'}}
            className="text-primary-white py-4 font-medium ">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView />
    </SafeAreaView>
  );
};

export default SignUpScreen;
