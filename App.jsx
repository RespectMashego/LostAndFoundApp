import { View, Text } from 'react-native'
import React from 'react'
import AppStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthStack'

const App = () => {
  const user=false
  return (
    user ? <AppStack /> : <AuthStack />
  )
}

export default App