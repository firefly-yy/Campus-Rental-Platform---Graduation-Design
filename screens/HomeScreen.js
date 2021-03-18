import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MallScreen from './MallScreen'
import PostScreen from './PostScreen'
import MessageScreen from './MessageScreen'
import MineScreen from './MineScreen'

const Tab = createBottomTabNavigator()

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Mall'
        component={MallScreen}
        options={{ title: 'Mall' }}
      />
      <Tab.Screen name='Post' component={PostScreen} />
      <Tab.Screen name='Message' component={MessageScreen} />
      <Tab.Screen name='Mine' component={MineScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
