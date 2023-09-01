import { initializeApp } from 'firebase/app'

import{ getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyD3gx8X7NZQCle4Z8oXex5svrYwGsw9dtU",
    authDomain: "modern-react-app-1f969.firebaseapp.com",
    projectId: "modern-react-app-1f969",
    storageBucket: "modern-react-app-1f969.appspot.com",
    messagingSenderId: "763669707916",
    appId: "1:763669707916:web:d10b9e6f6497d573c34fa9"
  };

  initializeApp(firebaseConfig);

  const db = getFirestore();
  const auth = getAuth();
  const provider =new GoogleAuthProvider();

  export { db, auth, provider };