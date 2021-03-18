import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const Stack = createStackNavigator()

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
}

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Mall'

  switch (routeName) {
    case 'Mall':
      return 'Mall'
    case 'Post':
      return 'Post'
    case 'Messages':
      return 'Messages'
    case 'Mine':
      return 'Mine'
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName='Home'
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
