import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "../screens/WelcomeScreen"
import SignUpScreen from "../screens/SignUpScreen"
import LogInScreen from "../screens/LogInScreen"



const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
              
            }}> 
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack