import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";

import { getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { getFirestore,
    doc, 
    setDoc,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { getStorage,
    ref, 
    uploadBytes,
    getDownloadURL ,
   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCwxVcJaC52-yUFDXwH-nLBw90bauS0K6I",
    authDomain: "e-commerce-web---shoplife.firebaseapp.com",
    projectId: "e-commerce-web---shoplife",
    storageBucket: "e-commerce-web---shoplife.appspot.com",
    messagingSenderId: "508774774692",
    appId: "1:508774774692:web:693c0a12d7ef41df4b7331",
    measurementId: "G-MYZQH7QR6Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const analytics = getAnalytics(app);

export {
    app,
    auth,
    db,
    storage,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    doc, 
    setDoc,
    ref, 
    uploadBytes,
    getDownloadURL, 
};
