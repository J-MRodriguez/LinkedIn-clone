import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzxLbX-rD2cLVrp1a3YUk5R4C8RBIRADY",
  authDomain: "linkedin-clone2-5b32c.firebaseapp.com",
  projectId: "linkedin-clone2-5b32c",
  storageBucket: "linkedin-clone2-5b32c.appspot.com",
  messagingSenderId: "887942585824",
  appId: "1:887942585824:web:ee39977318a9da0d311f85",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();

export { auth, provider, storage, storageRef };
export default db;
