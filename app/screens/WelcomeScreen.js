import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import AppButton from '../components/AppButton'
import colors from '../config/colors'

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      blurRadius={5}
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo-red.png')} style={styles.logo} />
        <Text style={styles.tagline}>租赁您暂不需要的资源</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton title='登陆' onPress={() => navigation.navigate('Login')} />
        <AppButton
          title='注册'
          color='secondary'
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </ImageBackground>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
  },
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 20,
    color: colors.medium,
  },
})
