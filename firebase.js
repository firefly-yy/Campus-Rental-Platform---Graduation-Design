import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA6_0PiN1SU3NdEcZFSjgA1fdj0SdURBf4',
  authDomain: 'campus-rental-platform.firebaseapp.com',
  projectId: 'campus-rental-platform',
  storageBucket: 'campus-rental-platform.appspot.com',
  messagingSenderId: '271032790410',
  appId: '1:271032790410:web:a9f2550b8a1729b7652c73',
}

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth };
