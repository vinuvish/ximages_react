import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCULVhohr0Bcv6x2MAky3oS2wbzOeo2jfY",
    authDomain: "ximages-86905.firebaseapp.com",
    databaseURL: "https://ximages-86905.firebaseio.com",
    projectId: "ximages-86905",
    storageBucket: "ximages-86905.appspot.com",
    messagingSenderId: "480752408795",
    appId: "1:480752408795:web:416e2a97b5bf089f1f54fe",
    measurementId: "G-R88Y6LWH9B"
};
firebase.initializeApp(config);
firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();

export { firebase, db, auth };
