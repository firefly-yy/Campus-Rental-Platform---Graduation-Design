import React, { useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Keyboard } from 'react-native'
import * as firebase from 'firebase'
import { db, auth } from '../../firebase'
import colors from '../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ListItem from '../components/lists/ListItem'

const ChatCopyScreen = ({ route, navigation }) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const id = route.params.id
  const title = route.params.title

  const sendMessage = () => {
    // Keyboard.dismiss()
    db.collection('card').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })

    setInput('')
  }

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('card')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
    return unsubscribe
  }, [route])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.light }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <MaterialCommunityIcons name='chevron-left' size={40} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 23,
            alignSelf: 'center',
            justifyContent: 'center',
            marginLeft: 30,
          }}
        >
          {title}
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={5}
      >
        <ScrollView
          contentContainerStyle={{ paddingTop: 15 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.reciever}>
                <Avatar
                  position='absolute'
                  bottom={-15}
                  right={-5}
                  //WEB
                  containerStyle={{
                    position: 'absolute',
                    bottom: -15,
                    right: -5,
                  }}
                  rounded
                  size={30}
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <Text style={styles.recieverText}>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.sender}>
                <Avatar
                  // position='absolute'
                  // bottom={-15}
                  // right={-5}
                  // //WEB
                  // containerStyle={{
                  //   position: 'absolute',
                  //   bottom: -15,
                  //   right: -5,
                  // }}

                  marginRight={10}
                  rounded
                  size={30}
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <View style={styles.details}>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                  <Text style={styles.senderText}>{data.message}</Text>
                </View>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={sendMessage}
            placeholder='Send Message'
            style={styles.textInput}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
            <Ionicons name='send' size={24} color='#2B68E6' />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* <Image
        source={route.params.item.images}
        style={{ width: 300, height: 300 }}
      /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  reciever: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
    marginRight: 15,
    maxWidth: '80%',
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
  senderText: {
    padding: 5,
    fontSize: 16,
  },
  senderName: {
    marginBottom: 3,
    fontSize: 13,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
})

export default ChatCopyScreen
