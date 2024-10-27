// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACqyOUDSdh81__QFDWdgyMY2MdIs3hfpg",
  authDomain: "ruhealthdb.firebaseapp.com",
  projectId: "ruhealthdb",
  storageBucket: "ruhealthdb.appspot.com",
  messagingSenderId: "1084742010203",
  appId: "1:1084742010203:web:20eb55857d9fa05ab6c67e",
  measurementId: "G-YPT34KS65K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export both db and auth
export { auth, db };
