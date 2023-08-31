import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import React from 'react'

const Item = () => {
    return (
        <TouchableOpacity className="  border-gray-300 rounded-[10px]" style={{
            width: Dimensions.get("window").width * 0.4,
            elevation: 2,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.3,
            backgroundColor: "#edeff7"

        }} >
            <View className="justify-center items-center  border-gray-500   " style={{ width: Dimensions.get("window").width * 0.4 }}>
                <Image
                    source={{ uri: "https://m.media-amazon.com/images/I/71h8ATGZZpL.jpg" }}
                    className="w-full h-36  rounded-[10px] rounded-b-none "
                    resizeMode='contain'

                />
                <View className="justify-start w-full  ml-4 my-2">
                    <Text style={{ color: "#040824",fontSize:18,fontWeight:"500" }}>Keys</Text>
                    <View className="flex-row items-center gap-1">
                        <FontAwesome6 name="location-dot" color="green" size={20} />
                        <Text style={{ color: "#040824" }}>Library</Text>
                    </View>
                    <Text style={{ color: "#040824" }}
                     className="text-[12px] font-light">54 mins ago</Text>

                </View>
            </View>

        </TouchableOpacity>
    )
}

export default Item