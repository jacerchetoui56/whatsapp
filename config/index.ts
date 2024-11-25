// Import the functions you need from the SDKs you need
import app from "firebase/compat";

import "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh2w7v99X1gaN6IbTIQk2_AJgFBkIpm_Y",
  authDomain: "manipfirebase-68b61.firebaseapp.com",
  databaseURL: "https://manipfirebase-68b61-default-rtdb.firebaseio.com",
  projectId: "manipfirebase-68b61",
  storageBucket: "manipfirebase-68b61.firebasestorage.app",
  messagingSenderId: "624705909827",
  appId: "1:624705909827:web:3c540cb9223d56cf6710f6",
  measurementId: "G-EZT6PZLJZW"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;
