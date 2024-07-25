import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// console.log(process.env.REACT_APP_API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyDMefrQwnn2YZAB97RUJ3kMmt_e4EtU7qI",
  authDomain: "typingtestweb-project-a0942.firebaseapp.com",
  projectId: "typingtestweb-project-a0942",
  storageBucket: "typingtestweb-project-a0942.appspot.com",
  messagingSenderId: "645018638254",
  appId: "1:645018638254:web:b32c20ef26d3f5d7401a3f",
  measurementId: "G-855TPCWEE5"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db}