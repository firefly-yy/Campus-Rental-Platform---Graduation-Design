import React from 'react'
import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import AppText from './AppText'
import colors from '../config/colors'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Asset } from 'expo-asset'
import { auth } from '../../firebase'

const Card = ({
  id,
  title,
  subTitle,
  image,
  userAvtar,
  userName,
  wants,
  looks,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} key={id}>
      <View style={styles.card}>
        {image && <Image source={{ uri: image }} style={styles.image} />}

        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
          >
            <AppText style={styles.subTitle}>{subTitle}</AppText>
            <AppText style={styles.wants}>{wants}人想要</AppText>
          </View>
          <View style={styles.userInfo}>
            <Image style={styles.photo} source={{ uri: userAvtar }} />
            <AppText style={{ marginLeft: 10 }}>{userName}</AppText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  subTitle: {
    color: 'red',
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  photo: {
    width: 25,
    height: 25,
    borderRadius: 35,
  },
  wants: {
    color: colors.medium,
    fontSize: 15,
  },
})
