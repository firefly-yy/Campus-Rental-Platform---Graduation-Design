import React, { Children, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import colors from '../config/colors'
import AppText from '../components/AppText'
import ListItem from '../components/lists/ListItem'
import AppButton from '../components/AppButton'
import { db, auth } from '../../firebase'
import Screen from '../components/Screen'
import { ScrollView } from 'react-native-gesture-handler'

const ItemDetailsScreen = ({ route, navigation }) => {
  const listing = route.params

  const deleteTo = () => {}

  return (
    <Screen>
      <ScrollView>
        {/* <Image style={styles.image} source={{ uri: listing.images[0] }} /> */}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{listing.title}</AppText>
          <AppText style={styles.price}>{'¥' + listing.price}</AppText>
          <AppText style={styles.description}>{listing.description}</AppText>
          <View style={styles.userContainer}>
            {listing.images.map((item) =>
              Children.toArray(
                <Image source={{ uri: item }} style={styles.image} />
              )
            )}
            {/* <ListItem
            image={require('../assets/mosh.jpg')}
            title='Sakura'
            subTitle='5 Listings'
          /> */}

            <AppButton title='下架商品' color='want' onPress={deleteTo} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
}

export default ItemDetailsScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    margin: 5,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 10,
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  description: {
    marginVertical: 5,
    fontSize: 25,
  },
})
