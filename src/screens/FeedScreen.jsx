import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Feather from "react-native-vector-icons/Feather"
import Item from '../components/Item'

const FeedScreen = () => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="  m-7 flex-row items-center justify-center  ">
        <View className="items-center justify-center flex-row   ">
          <TouchableOpacity >
            <Text style={{color:"#040824" }} className="font-bold text-[17px]">
              Lost Items
            </Text>
            <View className="h-[3px]  bg-slate-900 rounded-full " />
          </TouchableOpacity>
          <View style={{backgroundColor:"#040824" }} className="h-3 w-[2px] mx-1.5" />
          <TouchableOpacity>
            <Text style={{color:"#040824" }} className="text-[16px]  ">
              Found Items
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="absolute right-0" >
          <Feather name="search"  color="#040824"size={30} />
        </TouchableOpacity>
      </View>
      <View className="  flex-row flex-wrap justify-between mt-[20px] " style={{
        gap: 23, paddingHorizontal: Dimensions.get("window").width * 0.07
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