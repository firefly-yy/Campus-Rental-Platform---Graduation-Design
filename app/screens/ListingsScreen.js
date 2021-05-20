import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import Screen from '../components/Screen'
import Card from '../components/Card'
import colors from '../config/colors'
import routes from '../navigation/routes'
import AppTextInput from '../components/AppTextInput'
import { db, auth } from '../../firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { set } from 'react-native-reanimated'

const listings = [
  {
    id: 1,
    title: 'red jacket',
    price: 100,
    image: require('../assets/jacket.jpg'),
  },
  {
    id: 2,
    title: 'aaa jacket',
    price: 1000,
    image: require('../assets/jacket.jpg'),
    //  'https://images.unsplash.com/photo-1617789228557-20c856675e69?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
]

const ListingsScreen = ({ navigation }) => {
  const [cards, setCards] = useState([])
  const [input, setInput] = useState('')
  const [cardsCopy, setCardsCopy] = useState([])

  useEffect(() => {
    db.collection('card').onSnapshot((snapshot) => {
      setCards(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      ) 
      setCardsCopy(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])

  const all = () => {
    setCardsCopy(cards)
  }
  const book = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 1
      })
    )
  }
  const sport = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 2
      })
    )
  }
  const music = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 3
      })
    )
  }
  const food = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 4
      })
    )
  }
  const life = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 5
      })
    )
  }
  const car = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 6
      })
    )
  }
  const tools = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 7
      })
    )
  }
  const question = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 8
      })
    )
  }
  const other = () => {
    setCardsCopy(
      cards.filter((item) => {
        return item.data.category.value === 9
      })
    )
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name='shopping-search'
            size={20}
            color={colors.medium}
            style={{ padding: 10, marginLeft: 10 }}
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{
              backgroundColor: 'white',
              width: 300,
              height: 40,
            }}
          />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollBar}
        >
          <View style={{ flexDirection: 'row' }}>
            <Button title='全部' onPress={all} />
            <Button title='书籍' onPress={book} />
            <Button title='运动' onPress={sport} />
            <Button title='乐器' onPress={music} />
            <Button title='食物' onPress={food} />
            <Button title='生活用品' onPress={life} />
            <Button title='代步工具' onPress={car} />
            <Button title='电子设备' onPress={tools} />
            <Button title='答疑' onPress={question} />
            <Button title='其他' onPress={other} />
          </View>
        </ScrollView>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          {cardsCopy.map(
            (item) =>
              item.data.title.includes(input) && (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.data.title}
                  subTitle={'¥' + item.data.price}
                  image={item.data.images[0]}
                  userAvtar={item.data.userAvtar}
                  userName={item.data.userName}
                  wants={item.data.wants}
                  onPress={() => {
                    navigation.navigate(routes.LISTING_DeTAILS, {
                      item: item.data,
                      id: item.id,
                    }),
                      db
                        .collection('card')
                        .doc(item.id)
                        .update({
                          looks: ++item.data.looks,
                        })
                  }}
                />
              )
          )}
        </View>
      </ScrollView>
    </Screen>
  )
}

export default ListingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(234, 237, 237)',
  },
  header: {
    flexDirection: 'column',
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 45,
    borderRadius: 20,
  },
  button: {
    borderRadius: 30,
    padding: 5,
  },
  scrollBar: {
    height: 36,
  },
})
