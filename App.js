import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import navigationTheme from './app/navigation/navigationTheme'
import AppNavigator from './app/navigation/AppNavigator'
import RegisterScreen from './app/screens/RegisterScreen'
import LoginScreen from './app/screens/LoginScreen'
import WelcomeScreen from './app/screens/WelcomeScreen'
import ChatScreen from './app/screens/ChatScreen'
import ListingsScreen from './app/screens/ListingsScreen'
import ChatCopyScreen from './app/screens/ChatCopyScreen'

import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Remote debugger'])
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='AppNavigator' component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    // <ListingsScreen />
  )
}
