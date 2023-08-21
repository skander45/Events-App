// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5XtsoejyO0Q1ff_y8Kyc-7TXvN3MMFr8",
    authDomain: "cognira-app.firebaseapp.com",
    projectId: "cognira-app",
    storageBucket: "cognira-app.appspot.com",
    messagingSenderId: "580148951927",
    appId: "1:580148951927:web:52536b9947281501e4ff72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();