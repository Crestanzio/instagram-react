import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDoPhKONZUPBYZsG47hvaMyNZ0T8w9GfoE",
  authDomain: "instagram-react-app-a7902.firebaseapp.com",
  projectId: "instagram-react-app-a7902",
  storageBucket: "instagram-react-app-a7902.appspot.com",
  messagingSenderId: "1004935079979",
  appId: "1:1004935079979:web:364fe1931de6cbad1a626e",
};

const firebase = Firebase.initializeApp(config, "Instagram");
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
