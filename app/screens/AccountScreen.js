import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Screen from '../components/Screen'
import ListItem from '../components/lists/ListItem'
import colors from '../config/colors'
import Icon from '../components/Icon'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import { auth, db } from '../../firebase'
import * as ImagePicker from 'expo-image-picker'
import TestItem from '../components/lists/TestItem'
const menuItems = [
  {
    title: '我发布的',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.primary,
    },
    targetScreen: 'MyListings',
  },
  {
    title: '我的消息',
    icon: {
      name: 'email',
      backgroundColor: colors.secondary,
    },
    targetScreen: 'Messages',
  },
]

const AccountScreen = ({ navigation }) => {
  const [userPhoto, setUserPhoto] = useState(null)

  useEffect(() => {
    setUserPhoto(auth.currentUser.photoURL)
  }, [])
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      })
      if (!result.cancelled) {
        console.log(result.uri)
        auth.currentUser.updateProfile({
          photoURL: result.uri,
        })
        setUserPhoto(result.uri)
      }
    } catch (error) {
      console.log('Error reading an image', error)
    }
  }

  const logout = () => {
    auth.signOut().then(() => {
      navigation.replace('Login')
    })
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={auth.currentUser.displayName}
          subTitle={auth.currentUser.email}
          image={userPhoto}
          onPress={selectImage}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              ImageComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title='Log Out'
        ImageComponent={<Icon name='logout' backgroundColor='#ffe66d' />}
        onPress={logout}
      />
    </Screen>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
})
