import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/AccountScreen'
import MessagesScreen from '../screens/MessagesScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ListingEditScreen from '../screens/ListingEditScreen'
import ListingDetailsScreen from '../screens/ListingDetailsScreen'
import ItemDetailsScreen from '../screens/ItemDetailsScreen'

const Stack = createStackNavigator()

const PostNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='ListingEdit' component={ListingEditScreen} />
    <Stack.Screen name='ItemDetails' component={ItemDetailsScreen} />
  </Stack.Navigator>
)
export default PostNavigator
