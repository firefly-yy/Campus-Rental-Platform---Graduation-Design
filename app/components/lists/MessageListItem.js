import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableHighlight, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AppText from '../AppText'
import colors from '../../config/colors'
import { db } from '../../../firebase'

const MessageListItem = ({
  id,
  title,
  subTitle,
  image,
  ImageComponent,
  goods,
  onPress,
  renderRightActions,
}) => {
  const [chatMessages, setChatMessages] = useState([])
  // console.log(object)
  useEffect(() => {
    const unsubscribe = db
      .collection('card')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      )
    return unsubscribe
  }, [])
  // console.log(chatMessages)
  const a = () => {
    if (chatMessages?.[0]?.message) {
      return true
    } else {
      return false
    }
  }
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {ImageComponent}
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {/* {subTitle && ( */}
            {a() && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {chatMessages?.[0]?.displayName + ':'}{' '}
                {chatMessages?.[0]?.message}
              </AppText>
            )}
            {/* )} */}
          </View>
          <Image source={{ uri: goods[0] }} style={styles.goods} />
          {/* <MaterialCommunityIcons
            color={colors.medium}
            name='chevron-right'
            size={25}
          /> */}
        </View>
      </TouchableHighlight>
    </Swipeable>
  )
}

export default MessageListItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  title: {
    fontWeight: '500',
  },
  subTitle: {
    color: colors.medium,
  },
  goods: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
})
