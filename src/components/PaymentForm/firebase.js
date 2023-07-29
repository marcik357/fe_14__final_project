import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAjCMDYYIAR4sEEuyZWxzeB10Z-Pm86Bc",
  authDomain: "crypter-b65fc.firebaseapp.com",
  projectId: "crypter-b65fc",
  storageBucket: "crypter-b65fc.appspot.com",
  messagingSenderId: "37854008782",
  appId: "1:37854008782:web:87c15bcb6d07e3690fc79f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;