// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Public-facing name: project-222234589712
// Support email: jaygavali2005@gmail.com
const firebaseConfig = {
  apiKey: "AIzaSyAgyRV2XUFPTElGfKoFYeCaSYdPRUtNmCk",
  authDomain: "kiro-ai-backend.firebaseapp.com",
  projectId: "kiro-ai-backend",
  storageBucket: "kiro-ai-backend.firebasestorage.app",
  messagingSenderId: "222234589712",
  appId: "1:222234589712:web:d1e911ddfcaa94af896895",
  measurementId: "G-9L0W3WWJ2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Export Firebase services
export { app, analytics, auth, db, googleProvider };
export default app;