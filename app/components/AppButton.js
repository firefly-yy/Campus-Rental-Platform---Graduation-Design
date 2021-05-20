import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native'
import colors from '../config/colors'

const AppButton = ({ title, onPress, color = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})
