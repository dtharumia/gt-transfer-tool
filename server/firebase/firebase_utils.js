import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
require('dotenv').config()

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket
};

// const app = initializeApp(firebaseConfig);

// // Get a reference to the database service
// const database = getDatabase(app);

const dbRef = ref(getDatabase());
let result;

get(child(dbRef, `CS 1332/`)).then((snapshot) => {
  if (snapshot.exists()) {
    result = (snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

export default result;
