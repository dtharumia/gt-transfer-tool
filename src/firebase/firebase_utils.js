// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, query, equalTo, orderByChild, limitToFirst, limitToLast } from "firebase/database";

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

const db = getDatabase(app);

export const getGTCourses = () => get(ref(db, `transfers/all-gt-courses`)).then((snapshot) => {
    return snapshot.val()
}).catch((error) => {
    console.error(error);
});


export const getTransferCourses = (gt_course) => {

    return get(query(ref(db, 'transfers/'), orderByChild("gt_class"), equalTo(gt_course)))
        .then((snapshot) => {
            return snapshot.val()
        }).catch((error) => {
            console.error(error);
        });

}