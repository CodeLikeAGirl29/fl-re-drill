// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB7RhSSSpSvMVUtLlcP3bmkS7YVN6OPZk",
  authDomain: "fl-re-drills.firebaseapp.com",
  projectId: "fl-re-drills",
  storageBucket: "fl-re-drills.firebasestorage.app",
  messagingSenderId: "941831766197",
  appId: "1:941831766197:web:ae53aa6f624ff5f5303efc",
  measurementId: "G-P7WKW2V4VY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
