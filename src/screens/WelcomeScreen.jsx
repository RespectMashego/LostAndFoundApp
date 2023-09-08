
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { colors } from './colors'


const WelcomeScreen = () => {


  return (
    <SafeAreaView style={{backgroundColor:"white"}} className="bg-white flex-1 ">
      <Text className="text-center mt-10 mb-5 font-semibold text-xl ">
        Register  your account today for free
      </Text>
      <View className="  flex-1 items-center justify-center">
        <Image
          resizeMode='contain'
          style={{ width: Dimensions.get("window").width * 0.7, hegiht: 300 }} source={require("../assets/images/lostFoundLogo.jpg")} />
      </View>

      <View className=" bg-primary-white mb-4  rounded-t-[40px] z-10  ">
        <View className="justify-center items-center">
          <TouchableOpacity
            //onPress={handleNavigateToSignUpScreen}
            className=" bg-primary-blue rounded-full  justify-center items-center w-[90%] mt-4">
            <Text style={{
              color:"white"
            }}  className="text-primary-white py-4 font-medium ">
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            //onPress={handleNavigateToLogIn}
            className=" rounded-full justify-center items-center w-[90%] mt-2 border border-e-primary-lightGrey">
            <Text className="text-primary-black py-4 font-medium ">Log in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textRow}>
          <View style={styles.line}></View>
          <Text style={styles.text}>or</Text>
          <View style={styles.line}></View>
        </View>
        <View className="justify-center items-center">
          <TouchableOpacity
            //onPress={continueWithGoogle}
            className=" rounded-full justify-center items-center w-[90%] mt-2 border border-e-primary-lightGrey">
            <Image
              className="w-7 h-7 absolute left-3"
              source={require('../assets/images/googleIcon.png')}
            />
            <Text className="text-primary-black py-4 font-medium ">
              Continue with google
            </Text>
          </TouchableOpacity>
        </View>
      </View>



    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 7,
  },
  line: {
    height: 1,
    backgroundColor: '#888',
    marginHorizontal: 35,
    flex: 1,
  },
  text: {
    color: colors.primary.darkblue,
    marginHorizontal: 10,
    fontSize: 16,
  },
})


export default WelcomeScreen