import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDU5yMANIAFoQQgA85LhWk1_WDWiw0Rd0U",
    authDomain: "reconnect-8aca6.firebaseapp.com",
    projectId: "reconnect-8aca6",
    storageBucket: "reconnect-8aca6.appspot.com",
    messagingSenderId: "1053270580895",
    appId: "1:1053270580895:web:cc9673341212730fdcccaa",
    measurementId: "G-PDLS1THD3L",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, analytics, db }