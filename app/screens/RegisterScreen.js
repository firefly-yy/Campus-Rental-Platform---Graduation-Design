import React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import * as Yup from 'yup'

import Screen from '../components/Screen'
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from '../components/forms'
import { auth } from '../../firebase'

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
})

function RegisterScreen({ navigation }) {
  const handleSubmit = (user) => {
    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: user.name,
          photoURL:
            'https://cdn.pixabay.com/photo/2016/03/31/19/57/avatar-1295404__480.png',
        })
      })
      .then(alert('帐号注册成功'))
      .catch((error) => alert(error.message))

    navigation.navigate('Login')
  }
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon='account'
          name='name'
          placeholder='Name'
        />
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='email'
          keyboardType='email-address'
          name='email'
          placeholder='Email'
          textContentType='emailAddress'
        />
        <FormField
          autoCapitalize='none'
          autoCorrect={false}
          icon='lock'
          name='password'
          placeholder='Password'
          secureTextEntry
          textContentType='password'
        />
        <SubmitButton title='注册' />
      </Form>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default RegisterScreen
