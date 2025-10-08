export const environment = {
  production: true,
};

// Firebase
// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'; // Import the core app
import 'firebase/analytics'; // Import the analytics module for side effects

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDCb29bWaOo9mO5T8JtXbFVjZm_rrKdRpE',
  authDomain: 'chester-e1545.firebaseapp.com',
  projectId: 'chester-e1545',
  storageBucket: 'chester-e1545.firebasestorage.app',
  messagingSenderId: '383363182417',
  appId: '1:383363182417:web:c0cd7e83e6e452c2f96d70',
  measurementId: 'G-ZLHJ3KG8WR',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
const analytics = firebase.analytics(); // Use firebase.analytics() here
