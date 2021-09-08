import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQDFf7pWK2F5FYqSuIvTTqCEpooEo6V94",
  authDomain: "linkedin-clone-cae8f.firebaseapp.com",
  projectId: "linkedin-clone-cae8f",
  storageBucket: "linkedin-clone-cae8f.appspot.com",
  messagingSenderId: "578309418692",
  appId: "1:578309418692:web:06b193907bad7efbdfe391",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();

export { auth, provider, storage, storageRef };
export default db;
