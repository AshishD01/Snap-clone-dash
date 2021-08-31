import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

    apiKey: "AIzaSyBkl-MHWEi5IJyEKPAXeA8NTZZdgKKfbkY",
  
    authDomain: "snap-clone-dash.firebaseapp.com",
  
    projectId: "snap-clone-dash",
  
    storageBucket: "snap-clone-dash.appspot.com",
  
    messagingSenderId: "728907957049",
  
    appId: "1:728907957049:web:e77516a3e410d08a921ee8"
  
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  // export {db,auth,storage,provider};
  export {auth,db,provider,storage};
  

  

 