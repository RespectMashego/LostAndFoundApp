import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SignUpScreen from '../screens/SignUpScreen'
import FeedScreen from '../screens/FeedScreen'

const Stack = createNativeStackNavigator()

const AppStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}>
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default AppStack