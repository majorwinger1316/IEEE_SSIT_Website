import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "ieee-ssit.firebaseapp.com",
  projectId: "ieee-ssit",
  storageBucket: "ieee-ssit.appspot.com",
  messagingSenderId: "248609864183",
  appId: "1:248609864183:web:f32313ee8e4f10d62356f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
