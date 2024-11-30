import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB37VWrMqIdu46RU2p-ZtmWJsMdRTerNxg",
  authDomain: "react-express-c73ae.firebaseapp.com",
  projectId: "react-express-c73ae",
  storageBucket: "react-express-c73ae.firebasestorage.app",
  messagingSenderId: "283551086939",
  appId: "1:283551086939:web:cb9f106a044bb4c139c27e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
