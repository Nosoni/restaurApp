import firebase from 'firebase'
import 'firebase/firebase-storage'

const firebaseConfig = {
    apiKey: "AIzaSyBPLxIbMF4e7dPP1_Sdu1DkJ37h_Pzb1-o",
    authDomain: "asdf-78c63.firebaseapp.com",
    projectId: "asdf-78c63",
    storageBucket: "asdf-78c63.appspot.com",
    messagingSenderId: "517479105162",
    appId: "1:517479105162:web:a2c4d3e7774161a6a92373"
};
const fire = firebase.initializeApp(firebaseConfig);
const store = fire.storage()
export { store }