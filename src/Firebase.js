
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCiFjagdN08EriW9MTl-rrtckqIXYCUAL8",
  authDomain: "gupshup-82a37.firebaseapp.com",
  databaseURL: "https://gupshup-82a37-default-rtdb.firebaseio.com",
  projectId: "gupshup-82a37",
  storageBucket: "gupshup-82a37.appspot.com",
  messagingSenderId: "234541459823",
  appId: "1:234541459823:web:cc6c41dceb8f787c16a09a",
  measurementId: "G-1QGDLQR48T"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;