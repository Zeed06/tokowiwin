import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjXDZApty6SCYsxsnTQ3nrGWNA0G87oYc",
  authDomain: "tokowiwin-5c5d8.firebaseapp.com",
  projectId: "tokowiwin-5c5d8",
  storageBucket: "tokowiwin-5c5d8.firebasestorage.app",
  messagingSenderId: "26186479074",
  appId: "1:26186479074:web:2cd4b1d7b358b7c352b5bb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { app };

