import firebase from "firebase";

// Firebase config
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBHEoKN_3CxIn7ehxBHvisPHH4uhjyiewE",
  authDomain: "instagram-clone-db-93af9.firebaseapp.com",
  databaseURL: "https://instagram-clone-db-93af9.firebaseio.com",
  projectId: "instagram-clone-db-93af9",
  storageBucket: "instagram-clone-db-93af9.appspot.com",
  messagingSenderId: "387074529963",
  appId: "1:387074529963:web:8be34e738e72bbafdd35ee",
  measurementId: "G-KLGWPYE5B1"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };