import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrfQEaVPOa3Z3UyvG-JQu0KrG-wdNhZ0k",
  authDomain: "portfolio-admin-71c9b.firebaseapp.com",
  projectId: "portfolio-admin-71c9b",
  storageBucket: "portfolio-admin-71c9b.firebasestorage.app",
  messagingSenderId: "95543035023",
  appId: "1:95543035023:web:b0deac91e0875e29561cfa",
  measurementId: "G-BC5D908N16"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
