// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPh66jc_JSwC5CND5VSRBsub4KksX6OEQ",
  authDomain: "courtly-10499.firebaseapp.com",
  projectId: "courtly-10499",
  storageBucket: "courtly-10499.firebasestorage.app",
  messagingSenderId: "719970551024",
  appId: "1:719970551024:web:8814a672a6aa11cec2ae35",
  measurementId: "G-0JTMT8C675"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
