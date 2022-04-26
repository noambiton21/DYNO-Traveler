import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7-ptEgSoLYmPVhaxdqJ2hsjdJHJMGeKg",
  authDomain: "dyno-travel-il.firebaseapp.com",
  projectId: "dyno-travel-il",
  storageBucket: "dyno-travel-il.appspot.com",
  messagingSenderId: "638376653515",
  appId: "1:638376653515:web:9fa4e341a0cb301dfea14e",
  measurementId: "G-2R62T7YE0E",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
