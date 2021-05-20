import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import Screen from '../components/Screen'
import * as Yup from 'yup'
import { AppForm, AppFormField, SubmitButton } from '../components/forms'
import { auth } from '../../firebase'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
})

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('AppNavigator')
      }
    })
    return unsubscribe
  }, [])

  const login = (user) => {
     auth
       .signInWithEmailAndPassword(user.email, user.password)
       .catch((error) => alert(error))
  }
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo-red.png')} />
      <AppForm
        initialValues={{ email: '', password: '' }}
        onSubmit={login}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          icon='email'
          name='email'
          placeholder='Email'
          textContentType='emailAddress'
        />
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='lock'
          name='password'
          placeholder='Password'
          textContentType='password'
          secureTextEntry
        />
        <SubmitButton title='Login' />
      </AppForm>
    </Screen>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
})
