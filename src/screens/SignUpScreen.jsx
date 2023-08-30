
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'


const SignUpScreen = () => {

  return (
    <SafeAreaView className="bg-white flex-1 ">
      <Text className="text-center mt-10 mb-5 font-semibold text-xl ">
        Register  your account today for free
      </Text>
      <View className="  flex-1 items-center justify-center">
        <Image
          resizeMode='contain'
          style={{ width: Dimensions.get("window").width * 0.7, hegiht: 300 }} source={require("../assets/images/lostFoundLogo.jpg")} />
      </View>

      <TouchableOpacity
      style={{
        elevation:3
      }}
        className="mb-5 mx-4 border bg-white border-gray-600  rounded-full   flex-row justify-center items-center  px-10 py-3   "
      >
        <Image className="absolute left-3" style={{ width: 20, height: 20 }}
          resizeMode='contain'
          source={require("../assets/images/googleIcon.png")} />
        <Text  className="text-[17px]">
          Register with google
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default SignUpScreen