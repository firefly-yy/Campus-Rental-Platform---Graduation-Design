import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Image, Input } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
     if(authUser) {
      navigation.replace('Home')
     }
    })
  },[])

  const signIn = () => {
    auth.signInWithEmailAndPassword(email,password).catch(error => alert(error))
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={{
          url:
            'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0dWZmfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          autoFocus
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          type='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title='Login' />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate('Register')}
        title='Register'
        type='outline'
      />
      <View style={{height: 100}} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
