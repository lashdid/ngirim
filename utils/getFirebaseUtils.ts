import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ngirim-api.firebaseapp.com",
  projectId: "ngirim-api",
  storageBucket: "ngirim-api.appspot.com",
  messagingSenderId: "523128938253",
  appId: "1:523128938253:web:1c4c95b9c7bfced7c21a44",
  measurementId: "G-7HCKQZVS0E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
