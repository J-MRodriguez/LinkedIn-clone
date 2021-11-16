import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMohskKZGYkW9mNa_L9Wv9ztgz60SsueU",
  authDomain: "linkedin-clone3.firebaseapp.com",
  projectId: "linkedin-clone3",
  storageBucket: "linkedin-clone3.appspot.com",
  messagingSenderId: "342238753519",
  appId: "1:342238753519:web:f19e3542146a561486e11a"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();

export { auth, provider, storage, storageRef };
export default db;
