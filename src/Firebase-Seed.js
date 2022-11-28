import { getDatabase } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK59PrsyoWIKc04xeFWPJNNuqGskVn4HI",
  authDomain: "social-8a043.firebaseapp.com",
  projectId: "social-8a043",
  storageBucket: "social-8a043.appspot.com",
  messagingSenderId: "943304580968",
  appId: "1:943304580968:web:1a162f758adf38a00800dd",
  measurementId: "G-W46KDM4PHE"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app);

export { database, auth, app}