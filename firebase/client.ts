// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACijEMFBmxvODzronF0lu5MKJ49Sosjgk",
  authDomain: "prepwise-f505f.firebaseapp.com",
  projectId: "prepwise-f505f",
  storageBucket: "prepwise-f505f.firebasestorage.app",
  messagingSenderId: "407132626245",
  appId: "1:407132626245:web:3e656f1a4843119028b22c",
  measurementId: "G-9TERYM3TGY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
