import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import ListItem from '../components/lists/ListItem'
import Constants from 'expo-constants'
import Screen from '../components/Screen'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import ListItemDeleteAction from '../components/lists/ListItemDeleteAction'
import { auth, db } from '../../firebase'
import colors from '../config/colors'
import TestItem from '../components/lists/TestItem'
import MessageListItem from '../components/lists/MessageListItem'

const initialMessages = [
  {
    id: 1,
    title: 't1',
    description: 'd1',
    image: require('../assets/mosh.jpg'),
  },
  {
    id: 2,
    title: 't2',
    description: 'd2',
    image: require('../assets/mosh.jpg'),
  },
]

const MessagesScreen = ({ navigation }) => {
  const [needs, setNeeds] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const handleDelete = (need) => {
    // Delete the message from messages
    const res = db
      .collection('card')
      .doc(auth.currentUser.email)
      .collection('myNeeds')
      .doc(need.id)
      .delete()
    setNeeds(res)
  }
  const handleClick = (item) => {
    console.log(item)
    console.log('sss/////////////////////////')

    // navigation.navigate('Register')
  }
  useEffect(() => {
    const unsubscribe = db
      .collection('card')
      .doc(auth.currentUser.email)
      .collection('myNeeds')
      .onSnapshot((snapshot) =>
        setNeeds(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
    return unsubscribe
  }, [])

  return (
    <Screen style={styles.screen}>
      {needs.length === 0 ? (
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
          去租赁广场看看，选择您想要吧～
        </Text>
      ) : (
        <FlatList
          data={needs}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <MessageListItem
              id={item.data.itemId}
              title={item.data.userName}
              // subTitle={item.data.price}
              image={item.data.userAvtar}
              goods={item.data.images}
              onPress={() =>
                navigation.navigate('Chat', {
                  id: item.data.itemId,
                  title: item.data.title,
                })
              }
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          // onRefresh={() => {
          //   setNeeds([
          //     {
          //       id: 2,
          //       title: 't2',
          //       description: 'd2',
          //       image: require('../assets/mosh.jpg'),
          //     },
          //   ])
          // }}
        />
      )}
    </Screen>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({})
