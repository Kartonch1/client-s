// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRGHoo9eaVK4R4Z9UJg024mLY3oM5uqFw",
  authDomain: "project-bdb86.firebaseapp.com",
  projectId: "project-bdb86",
  storageBucket: "project-bdb86.appspot.com",
  messagingSenderId: "263081729945",
  appId: "1:263081729945:web:c6ea8ab3231724bb58fd08",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();
