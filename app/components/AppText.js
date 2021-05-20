import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'
import defaultStyles from '../config/style'
const AppText = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  )
}

export default AppText
