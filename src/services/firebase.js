import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTIoLwFNDi1hNHsoWmtKBf-3Ha0UjW-Bc",
  authDomain: "bitesizedapp.firebaseapp.com",
  projectId: "bitesizedapp",
  storageBucket: "bitezisedapp.appspot.com",
  messagingSenderId: "447689281672",
  appId: "1:447689281672:web:cdf0bc133175b6f2c88f3d",
  measurementId: "G-2P4P6JDD21",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
