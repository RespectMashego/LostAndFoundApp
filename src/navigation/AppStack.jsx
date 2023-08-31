import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SignUpScreen from '../screens/SignUpScreen'
import FeedScreen from '../screens/FeedScreen'
import BottomTabNavigator from './BottomTabNavigator'
import PostItemScreen from '../screens/PostItemScreen'


const Stack = createNativeStackNavigator()

const AppStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}>
                  <Stack.Screen name="Home" component={BottomTabNavigator}/>
                <Stack.Screen name="PostItemScreen" component={PostItemScreen} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default AppStack