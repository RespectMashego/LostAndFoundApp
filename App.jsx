import { View, Text } from 'react-native'
import React from 'react'
import AppStack from './src/navigation/AppStack'
import AuthStack from './src/navigation/AuthStack'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/AppNavigation';

const App = () => (
  <Provider store={store}>
    <AppNavigation />
  </Provider>
)

export default App