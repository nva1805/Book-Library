import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";
// import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY-YnaFXfGS0rj28pvELxxJz7BSbcZkWc",
  authDomain: "backend-booklibrary.firebaseapp.com",
  projectId: "backend-booklibrary",
  storageBucket: "backend-booklibrary.appspot.com",
  messagingSenderId: "199762599559",
  appId: "1:199762599559:web:ee7bb639265b0a35586222"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider(app);



export { storage, auth, database, provider };
