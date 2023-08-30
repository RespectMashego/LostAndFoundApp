import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from "react-native-vector-icons/Feather"
import Item from '../components/Item'

const FeedScreen = () => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className=" m-6 flex-row items-center justify-center  ">
        <View className="items-center justify-center flex-row   ">
          <TouchableOpacity >
            <Text className="font-bold text-[17px]  ">
              Lost Items
            </Text>
            <View className="h-[3px]  bg-blue-900 rounded-full " />
          </TouchableOpacity>
          <View className="bg-gray-500 h-3 w-[2px] mx-1.5" />
          <TouchableOpacity>
            <Text className="text-[16px]">
              Found Items
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="absolute right-0" >
          <Feather name="search" size={30} />
        </TouchableOpacity>
      </View>
      <View className=" px-5 flex-row flex-wrap justify-center mt-[20]"  style={{
        gap:20
      }}>
        <Item />
        <Item />
        <Item />
        <Item />
      </View>

    </SafeAreaView>
  )
}

export default FeedScreen