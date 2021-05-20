import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import ListItem from '../components/lists/ListItem'
import Constants from 'expo-constants'
import Screen from '../components/Screen'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import ListItemDeleteAction from '../components/lists/ListItemDeleteAction'
import { auth, db } from '../../firebase'
import TestItem from '../components/lists/TestItem'
import colors from '../config/colors'

const MyListingsScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const handleDelete = (message) => {
    // Delete the message from messages
    const res = db
      .collection('card')
      .doc(auth.currentUser.email)
      .collection('item')
      .doc(message.id)
      .delete()
    setMessages(res)
    // setMessages(messages.filter((m) => m.id !== message.id))
  }
  //////////////////////////////////////////////////////
  useEffect(() => {
    const unsubscribe = db
      .collection('card')
      .doc(auth.currentUser.email)
      .collection('item')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
    return unsubscribe
  }, [])
  /////////////////////////////////////////////////////

  return (
    <Screen style={styles.screen}>
      {messages.length === 0 ? (
        <Text
          style={{
            marginTop: 50,
            padding: 35,
            justifyContent: 'center',
            flex: 1,
            fontSize: 20,
            color: colors.medium,
            textAlign: 'center',
          }}
        >
          赶快去发布您需要出租的资源吧！
        </Text>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <TestItem
              title={item.data.title}
              subTitle={item.data.price}
              image={item.data.images[0]}
              onPress={() => console.log('Message selected', item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            // setMessages([
            //   {
            //     id: 2,
            //     title: 't2',
            //     description: 'd2',
            //     image: require('../assets/mosh.jpg'),
            //   },
            // ])
            console.log('here return new listings(because of delete)')
          }}
        />
      )}
    </Screen>
  )
}

export default MyListingsScreen

const styles = StyleSheet.create({})
