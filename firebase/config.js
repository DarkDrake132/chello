// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGVnL4s696zBN0Ze-bS4KHml_VUJqV5JI",
  authDomain: "chello-dea9c.firebaseapp.com",
  projectId: "chello-dea9c",
  storageBucket: "chello-dea9c.appspot.com",
  messagingSenderId: "47794434128",
  appId: "1:47794434128:web:90abdb539fc7bb5c33a155",
  measurementId: "G-D6WCC6XWV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db }