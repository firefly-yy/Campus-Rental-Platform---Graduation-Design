import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import {Button } from 'react-native-elements'

const MallScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput style={styles.textInput}>
          <FontAwesome
            name='search'
            size={20}
            color='grey'
            style={{ marginRight: 10 }}
          />
        </TextInput>
        <Button title='search' style={styles.button} />
      </View>

      <ScrollView>
        <Text>aaaaaa</Text>
      </ScrollView>
    </View>
  )
}

export default MallScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    marginTop: 10,
    borderColor: 'orange',
    borderWidth: 1,
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
  button: {
   backgroundColor: 'orange',
   borderRadius: 30,
   padding:10
  }
})
