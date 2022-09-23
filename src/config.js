import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyCTo_UWi8ucT4Mr2ikF4kgOElo9bJ1QxMg",
  authDomain: "sport-app-chat.firebaseapp.com",
  projectId: "sport-app-chat",
  storageBucket: "sport-app-chat.appspot.com",
  messagingSenderId: "32199465854",
  appId: "1:32199465854:web:e47fb9dcf0f19dbb85b12f",
});

export const firebaseRef = firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
