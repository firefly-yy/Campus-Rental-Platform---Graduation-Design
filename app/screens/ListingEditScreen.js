import React, { useState, useEffect } from 'react'
import { Keyboard, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { db, auth } from '../../firebase'
import CategoryPickerItem from '../components/CategoryPickerItem'
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from '../components/forms'
import FormImagePicker from '../components/forms/FormImagePicker'
import Screen from '../components/Screen'

//限制，标题要写，价格最大为10000
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.'),
})

const categories = [
  {
    backgroundColor: '#a55eea',
    icon: 'book-open-variant',
    label: '书籍',
    value: 1,
  },
  {
    backgroundColor: '#45aaf2',
    icon: 'basketball',
    label: '运动',
    value: 2,
  },

  {
    backgroundColor: '#fed330',
    icon: 'guitar-acoustic',
    label: '乐器',
    value: 3,
  },
  {
    backgroundColor: '#26de81',
    icon: 'noodles',
    label: '食物',
    value: 4,
  },
  {
    backgroundColor: '#fc5c65',
    icon: 'floor-lamp',
    label: '生活用品',
    value: 5,
  },
  {
    backgroundColor: '#fd9644',
    icon: 'car',
    label: '代步工具',
    value: 6,
  },
  {
    backgroundColor: '#4b7bec',
    icon: 'headphones',
    label: '电子设备',
    value: 7,
  },
  {
    backgroundColor: '#2bcbba',
    icon: 'comment-question',
    label: '答疑',
    value: 8,
  },

  {
    backgroundColor: '#778ca3',
    icon: 'application',
    label: '其他',
    value: 9,
  },
]

const ListingEditScreen = ({ navigation }) => {
  const postItem = async (item) => {
    console.log(item.images)
    await db
      .collection('card')
      .add({
        title: item.title,
        price: item.price,
        category: item.category,
        images: item.images,
        description: item.description,
        looks: 0,
        wants: 0,
        userEmail: auth?.currentUser.email,
        userName: auth?.currentUser.displayName,
        userAvtar: auth?.currentUser.photoURL,
      })
      .then(navigation.navigate('ItemDetails', item))
      .catch((error) => alert(error))
    ///////////////////////////////////////////////////////
    db.collection('card')
      .doc(auth.currentUser.email)
      .collection('item')
      .add({
        images: item.images,
        title: item.title,
        price: item.price,
        description: item.description,
      })
      .catch((error) => alert(error))
  }

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          title: '',
          price: '',
          description: '',
          category: null,
          images: [],
        }}
        onSubmit={postItem}
        validationSchema={validationSchema}
      >
        <FormImagePicker name='images' />
        <AppFormField maxLength={255} name='title' placeholder='title' />
        <AppFormField
          keyboardType='numeric'
          maxLength={8}
          width={120}
          name='price'
          placeholder='Price'
        />
        <AppFormPicker
          items={categories}
          numberOfColumns={3}
          name='category'
          placeholder='Category'
          width='50%'
          PickerItemComponent={CategoryPickerItem}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppFormField
            maxLength={255}
            multiline
            name='description'
            numberOfLines={3}
            placeholder='Description'
          />
        </TouchableWithoutFeedback>
        <SubmitButton title='Post' />
      </AppForm>
    </Screen>
  )
}

export default ListingEditScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})
