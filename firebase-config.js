// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA963qXRWL-LGas6G8lM3HxqjoWoS-KRAE",
  authDomain: "lab4firebaseauth.firebaseapp.com",
  projectId: "lab4firebaseauth",
  storageBucket: "lab4firebaseauth.appspot.com",
  messagingSenderId: "645223133698",
  appId: "1:645223133698:android:08321fd15ac7b492766d1b",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
