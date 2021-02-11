import firebase from "firebase/app";
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDe94zOvsOKBCHOlnEcEV7Tl0bbZOwNkbs",
  authDomain: "izily-test.firebaseapp.com",
  projectId: "izily-test",
  storageBucket: "izily-test.appspot.com",
  messagingSenderId: "1042871062612",
  appId: "1:1042871062612:web:bfe66427e1f3684d605dc1",
};
// Initialize Firebase

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
