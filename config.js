//import * as firebase from 'firebase';
//require('@firebase/firestore')
import { firebase } from '@firebase/app';
import '@firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBTIpabI_DT2PaPBBEfO2FIDswURqY6D6o",
    authDomain: "wily-182c2.firebaseapp.com",
    databaseURL: "https://wily-182c2.firebaseio.com",
    projectId: "wily-182c2",
    storageBucket: "wily-182c2.appspot.com",
    messagingSenderId: "1022128544264",
    appId: "1:1022128544264:web:568fe6f98474274aae8fbd"
  };
  // Initialize Firebase

  if(!firebase.apps.length){

    firebase.initializeApp(firebaseConfig);
    }
  
  
  export default firebase.firestore();