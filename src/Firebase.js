// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA-Y5Yd8GvKsm5Uvl6Y6aPF0G-0RobVMu4",
  authDomain: "setux-1881.firebaseapp.com",
  databaseURL:
    "https://setux-1881-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "setux-1881",
  storageBucket: "setux-1881.appspot.com",
  messagingSenderId: "255620402997",
  appId: "1:255620402997:web:36fc1218d2561e0843c67c",
  measurementId: "G-QJHGJC0LSH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication object
const db = getFirestore(app); // Get the Firestore object
export { auth }; // Export the auth object
export { db };
export { app };
export { createUserWithEmailAndPassword, doc, setDoc };
