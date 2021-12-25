// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBGVnL4s696zBN0Ze-bS4KHml_VUJqV5JI",
  authDomain: "chello-dea9c.firebaseapp.com",
  projectId: "chello-dea9c",
  storageBucket: "chello-dea9c.appspot.com",
  messagingSenderId: "47794434128",
  appId: "1:47794434128:web:90abdb539fc7bb5c33a155",
  measurementId: "G-D6WCC6XWV8",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();
const auth = getAuth();
export { db, auth };