// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDatabase, set } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbY8VvZttjw0d5H_qizkVUt6Jjtky4zGE",
  authDomain: "socialapp-82511.firebaseapp.com",
  projectId: "socialapp-82511",
  storageBucket: "socialapp-82511.appspot.com",
  messagingSenderId: "1001222575611",
  appId: "1:1001222575611:web:9aae1825aab4f4f59c675e",
  measurementId: "G-PG1S36EX3E",
  databaseURL:
    "https://socialapp-82511-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const user = auth.currentUser;
export const db = getFirestore(app);

//functions

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

export const CreateUserName = async ({ username }) => {
  try {
    await setDoc(doc(db, "users", `${auth.currentUser?.uid}`), {
      username: username,
      userId: auth?.currentUser?.uid,
    });
  } catch (err) {
    console.log(err);
  }
};

//
