import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostItemScreen from '../screens/PostItemScreen';
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

    return (

        <Tab.Navigator initialRouteName='FeedScreen' screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#edeff7",
                height: 70,
                position: "absolute",
                margin: 15,
                borderRadius: 30,
                elevation: 0
            }

        }}
        >
            <Tab.Screen name="FeedScreen" component={FeedScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View className=" items-center justify-center">
                        <Feather name="home" size={25} color={focused ? "red" : '#040824'} />
                        <Text style={{ color: focused ? "red" : '#040824' }} >Home</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="PostItemScreen" component={PostItemScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View className=" items-center justify-center h-14 w-14 rounded-[20px] bg-primary-darkblue ">
                        < Ionicons name="add" size={26} color={focused ? "red" : 'white'} />
                    </View>
                )
                ,
                tabBarStyle: { display: "none" }
            }} />


            <Tab.Screen name='ProfileScreen' component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className=" items-center justify-center">
                            <Feather name="user" size={25} color={focused ? "red" : '#040824'} />
                            <Text className="" style={{ color: focused ? "red" : '#040824' }}>profile</Text>
                        </View>
                    )
                }}
            />


        </Tab.Navigator>

    )
}

export default BottomTabNavigator