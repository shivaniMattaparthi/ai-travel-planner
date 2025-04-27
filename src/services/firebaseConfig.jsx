// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs4iIy2BT5qhlYhc8fElJDwlvrO5TnVD4",
  authDomain: "ai-travel-planner-854fb.firebaseapp.com",
  projectId: "ai-travel-planner-854fb",
  storageBucket: "ai-travel-planner-854fb.firebasestorage.app",
  messagingSenderId: "542178208138",
  appId: "1:542178208138:web:4f42f424868a034ebf0073"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)