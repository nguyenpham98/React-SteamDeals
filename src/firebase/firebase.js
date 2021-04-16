import firebase from 'firebase/app';

import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

firebase.initializeApp({
    apiKey: "AIzaSyDJsQs7aysQH5DYl7YdXHSKRJVU9bGPsVo",
    authDomain: "react-steamdeals.firebaseapp.com",
    projectId: "react-steamdeals",
    storageBucket: "react-steamdeals.appspot.com",
    messagingSenderId: "761323851081",
    appId: "1:761323851081:web:8d5dc8b871fe00745b5e98"
})

const emulate=false;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

if(window.location.hostname.includes('localhost') && emulate){
    auth.useEmulator("http://localhost:9099");
    functions.useEmulator('localhost', 5001);
    firestore.useEmulator('localhost', 8080);
}

export default firebase;


