import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDCHNqxE8b6MPcM0UpdEpo5AWFY-YDSLBw",
  authDomain: "fintracker-1b056.firebaseapp.com",
  projectId: "fintracker-1b056",
  storageBucket: "fintracker-1b056.appspot.com",
  messagingSenderId: "797507509181",
  appId: "1:797507509181:web:137f6d61a564711800d0d4"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const finTrackaFirestore = firebase.firestore()

export { finTrackaFirestore }