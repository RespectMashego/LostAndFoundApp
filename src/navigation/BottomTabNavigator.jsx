import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostItemScreen from '../screens/PostItemScreen';

const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator()
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='FeedScreen'>
                <Tab.Screen name="FeedScreen" component={FeedScreen} />
                <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
                <Tab.Screen name="PostItemScreen" component={PostItemScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomTabNavigator