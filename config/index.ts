// Import the functions you need from the SDKs you need
import app from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2F-_bXv74fbX2I7Cy3zo45kE8O0phCpo",
  authDomain: "tp-mobile-2f32d.firebaseapp.com",
  databaseURL: "https://tp-mobile-2f32d-default-rtdb.firebaseio.com",
  projectId: "tp-mobile-2f32d",
  storageBucket: "tp-mobile-2f32d.firebasestorage.app",
  messagingSenderId: "666753515506",
  appId: "1:666753515506:web:45b397e4a6f40b8131f56b",
  measurementId: "G-4CD86VHWEV",
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);

export default firebase;
