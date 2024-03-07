// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmLqiYazzkmqUIO8mL2OS0L2DLhLDmCKo',
  authDomain: 'messenger-75277.firebaseapp.com',
  projectId: 'messenger-75277',
  storageBucket: 'messenger-75277.appspot.com',
  messagingSenderId: '1088023079472',
  appId: '1:1088023079472:web:20180f2b27246572189bf5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()