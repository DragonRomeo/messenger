import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDb0i0q7oloi4UF8voEaBBNBC8Kj7ggG14',
  authDomain: 'messegner2.firebaseapp.com',
  projectId: 'messegner2',
  storageBucket: 'messegner2.appspot.com',
  messagingSenderId: '635125594512',
  appId: '1:635125594512:web:5a0c2a8f6d04542c721b15',
  measurementId: 'G-Y0R5S3W86J',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
