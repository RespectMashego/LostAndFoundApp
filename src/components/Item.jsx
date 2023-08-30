import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'

const Item = () => {
    return (
        <TouchableOpacity className=" bg-gray-300 rounded-3xl" style={{ width: Dimensions.get("window").width * 0.4, elevation: 1 }} >
            <View className="justify-center items-center " style={{width:"100%"}}>
                <Image resizeMode='cover'
                    source={{ uri: "https://m.media-amazon.com/images/I/71h8ATGZZpL.jpg" }}
                    className="w-36 h-36"

                />
            </View>

        </TouchableOpacity>
    )
}

export default Item