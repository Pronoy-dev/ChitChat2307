// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyYgYYO-eje7cgvxCwYEWa0Aa1DFF-Biw",
  authDomain: "chitchat2307-aded9.firebaseapp.com",
  databaseURL: "https://chitchat2307-aded9-default-rtdb.firebaseio.com",
  projectId: "chitchat2307-aded9",
  storageBucket: "chitchat2307-aded9.appspot.com",
  messagingSenderId: "67433931594",
  appId: "1:67433931594:web:ef35cdff805843d36457b3",
};

// Initialize Firebase
const dbapp = initializeApp(firebaseConfig);
console.log("firebase ok");
export default dbapp;
