import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const Register = () => {
    if (verifyPassword === password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: name,
            photoURL: '',
          })
        })
        .catch((error) => alert(error.message)).then(alert('successful'))
        .then(navigation.navigate('Login'))
    } else {
      alert('Two passwords are inconsistent')
    }

  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder='userName'
          autoFocus
          type='Text'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder='email'
          type='Text'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='password'
          type='Text'
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder='verify password'
          type='Text'
          value={verifyPassword}
          secureTextEntry
          onChangeText={(text) => setVerifyPassword(text)}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={Register}
        title='Register'
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})
