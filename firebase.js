// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsEjA6AXvXDA449p3avp0IvjlfWod6dLs",
  authDomain: "todoapp-ecd1c.firebaseapp.com",
  projectId: "todoapp-ecd1c",
  storageBucket: "todoapp-ecd1c.appspot.com",
  messagingSenderId: "429460286111",
  appId: "1:429460286111:web:dca2f91731ce3210aed0aa",
  measurementId: "G-FSCJMRQ5D6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };