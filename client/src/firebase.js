// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webcraftai-cbe0b.firebaseapp.com",
  projectId: "webcraftai-cbe0b",
  storageBucket: "webcraftai-cbe0b.firebasestorage.app",
  messagingSenderId: "1073513606643",
  appId: "1:1073513606643:web:30396739b8223d8d2a3686"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}