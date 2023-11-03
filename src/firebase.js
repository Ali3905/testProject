// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIluOi_72CCWqctL2bDKNUr6-Z651Mu80",
  authDomain: "testproject-78661.firebaseapp.com",
  projectId: "testproject-78661",
  storageBucket: "testproject-78661.appspot.com",
  messagingSenderId: "14161159042",
  appId: "1:14161159042:web:e05e55f987a730b66ee59b"
};

const app = initializeApp(firebaseConfig);

// const auth = getAuth()
const auth = getAuth();
// const storage = getStorage();
const db = getFirestore(app);
const imageDB = getStorage(app)

export { auth, app, db, imageDB  }