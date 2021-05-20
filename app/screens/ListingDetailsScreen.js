import React, { Children, useEffect } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import colors from '../config/colors'
import AppText from '../components/AppText'
import ListItem from '../components/lists/ListItem'
import AppButton from '../components/AppButton'
import { db, auth } from '../../firebase'
import Screen from '../components/Screen'
import ListItemSeparator from '../components/lists/ListItemSeparator'

const ListingDetailsScreen = ({ route, navigation }) => {
  const listing = route.params.item
  const id = route.params.id
  console.log(listing.userEmail)
  const flag = listing.userEmail === auth.currentUser.email
  console.log(flag)

  const wantTo = async () => {
    await db
      .collection('card')
      .doc(auth.currentUser.email)
      .collection('myNeeds')
      .add({
        itemId: id,
        images: listing.images,
        description: listing.description,
        title: listing.title,
        userAvtar: listing.userAvtar,
        userName: listing.userName,
      })
      .then(navigation.navigate('Chat', { title: listing.title, id: id }))
      .catch((error) => alert(error))

    db.collection('card')
      .doc(id)
      .update({
        wants: ++listing.wants,
      })
  }
  const deleteTo = () => {
    db.collection('card')
      .doc(id)
      .delete()
      .then(alert('下架成功'))
      .then(navigation.goBack())
  }

  return (
    <Screen>
      <ScrollView>
        <ListItem
          title={listing.userName}
          image={listing.userAvtar}
          subTitle={listing.userEmail}
        />
        <ListItemSeparator />
        <View style={styles.detailsContainer}>
          {/* <AppText style={styles.title}>{listing.title}</AppText> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <AppText style={styles.price}>{'¥' + listing.price}</AppText>
            <AppText style={{ color: colors.medium, fontSize: 17 }}>
              {listing.wants}想要 · 浏览{listing.looks}
            </AppText>
          </View>
          <ScrollView style={styles.userContainer}>
            <AppText style={styles.description}>{listing.description}</AppText>
            {/* <Image style={styles.image} source={{ uri: listing.images[0] }} /> */}
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
            <View style={styles.buttonsContainer}>
              <AppButton title='我想要' color='want' onPress={wantTo} />
              {flag && (
                <AppButton title='下架商品' color='want' onPress={deleteTo} />
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </Screen>
  )
}

export default ListingDetailsScreen

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
