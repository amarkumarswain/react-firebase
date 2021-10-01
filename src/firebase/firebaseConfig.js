import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Initialize Firebase
let config = {
    apiKey: "AIzaSyBqEeZyluRNBbmiQSuXQWPJ17cAeQ5Kwt0",
    authDomain: "react-firebase-developme-3599d.firebaseapp.com",
    projectId: "react-firebase-developme-3599d",
    storageBucket: "react-firebase-developme-3599d.appspot.com",
    messagingSenderId: "715281912012",
    appId: "1:715281912012:web:8397e5a3c8e87e1a837269"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;







// import app from 'firebase/compat/app'
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'

// const config = {
//     apiKey: "AIzaSyBqEeZyluRNBbmiQSuXQWPJ17cAeQ5Kwt0",
//     authDomain: "react-firebase-developme-3599d.firebaseapp.com",
//     projectId: "react-firebase-developme-3599d",
//     storageBucket: "react-firebase-developme-3599d.appspot.com",
//     messagingSenderId: "715281912012",
//     appId: "1:715281912012:web:8397e5a3c8e87e1a837269"
// }

// class Firebase{
//     constructor(){
//         app.initializeApp(config);
//         this.auth = app.auth();
//         this.db = app.firestore();
//     }
//     authFun(){
//         return this.auth;
//     }
//     dbFun(){
//         return this.db;
//     }
// }

// const obj = new Firebase();
// export const auth = obj.authFun();
// export const db = obj.dbFun();

// // export default Firebase;