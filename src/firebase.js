import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBqEeZyluRNBbmiQSuXQWPJ17cAeQ5Kwt0",
    authDomain: "react-firebase-developme-3599d.firebaseapp.com",
    projectId: "react-firebase-developme-3599d",
    storageBucket: "react-firebase-developme-3599d.appspot.com",
    messagingSenderId: "715281912012",
    appId: "1:715281912012:web:8397e5a3c8e87e1a837269"
});

export const auth = app.auth();
export const db = firebase.firestore();
export default app;