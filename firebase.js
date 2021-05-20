import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDyDg_srNLvdeySf76-P56kqMB6811Aa_4',
  authDomain: 'rental-platform-d2f5d.firebaseapp.com',
  projectId: 'rental-platform-d2f5d',
  storageBucket: 'rental-platform-d2f5d.appspot.com',
  messagingSenderId: '979080000099',
  appId: '1:979080000099:web:49a9f540fc10d617e83e56',
}

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }
