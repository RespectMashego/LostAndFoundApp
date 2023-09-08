import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SignUpScreen from '../screens/WelcomeScreen'
import FeedScreen from '../screens/FeedScreen'
import BottomTabNavigator from './BottomTabNavigator'
import PostItemScreen from '../screens/PostItemScreen'
import FilterItemScreen from '../screens/FilterItemScreen'
import ItemView from '../screens/ItemView'


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
                <Stack.Screen name="FilterItemScreen" component={FilterItemScreen} />
                <Stack.Screen name="ItemViewScreen" component={ItemView} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default AppStack