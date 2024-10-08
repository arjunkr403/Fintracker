import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fintraker.firebaseapp.com",
  projectId: "fintraker",
  storageBucket: "fintraker.appspot.com",
  messagingSenderId: "635249668615",
  appId: process.env.REACT_APP_FIREBASE_API_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, setDoc, doc, analytics };
