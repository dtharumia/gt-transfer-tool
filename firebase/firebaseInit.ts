// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-VUTou05DhrHMaf_BePaCEbTjvFBj4hI",
  authDomain: "gt-transfer-tool.firebaseapp.com",
  databaseURL: "https://gt-transfer-tool-default-rtdb.firebaseio.com",
  projectId: "gt-transfer-tool",
  storageBucket: "gt-transfer-tool.appspot.com",
  messagingSenderId: "492205881594",
  appId: "1:492205881594:web:6823ac5613c2b52714f143",
  measurementId: "G-ZX1QY641M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)