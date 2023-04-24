// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNHRj9R92-rK0qSZQPcURxZZm022WNUmw",
  authDomain: "ofnipet.firebaseapp.com",
  projectId: "ofnipet",
  storageBucket: "ofnipet.appspot.com",
  messagingSenderId: "534152610752",
  appId: "1:534152610752:web:2702049eb65c47d0f3fe25",
  measurementId: "G-NMN22YYPCC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
