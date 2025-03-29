import { initializeApp,getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWIDbtA1vtsJBYeTPCLX5ihvH4360q_pw",
  authDomain: "interview-ai-94cad.firebaseapp.com",
  projectId: "interview-ai-94cad",
  storageBucket: "interview-ai-94cad.firebasestorage.app",
  messagingSenderId: "934446441242",
  appId: "1:934446441242:web:11dad8a0e806a3b94802a3",
  measurementId: "G-ENRKBNFLRQ"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();


export const auth = getAuth(app)
export const db = getFirestore(app)