import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase'

import colors from '../config/colors'

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission()
  }, [])

  const requestPermission = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync()
    if (!granted) alert('You need to enable permission to access the library.')
    //requestCameraRollPermissionsAsync()
  }

  const handlePress = () => {
    if (!imageUri) selectImage()
    else
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        { text: 'Yes', onPress: () => onChangeImage(null) },
        { text: 'No' },
      ])
  }

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      })
      // console.log(result.uri)
      if (!result.cancelled) {
        onChangeImage(result.uri)
        // uploadImage(result.uri, Math.random()).catch((error) =>
        //   console.log(error)
        // )
      }
    } catch (error) {
      console.log('Error reading an image', error)
    }
  }

  // const uploadImage = async (uri, imageName) => {
  //   const response = await fetch(uri)
  //   const blob = await response.blob()
  //   console.log(imageName)
  //   var ref = firebase
  //     .storage()
  //     .ref()
  //     .child('images/' + imageName)
  //   ref.put(blob).then(onChangeImage(await ref.getDownloadURL()))
  //   //   () => {
  //   //   const a = await ref.getDownloadURL()
  //   //   onChangeImage(a)

  //   // }
  // }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name='camera'
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: 100,
  },
  image: {
    height: '100%',
    width: '100%',
  },
})

export default ImageInput
