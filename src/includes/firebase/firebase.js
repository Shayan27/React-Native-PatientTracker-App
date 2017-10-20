import * as firebase from "firebase";

class Firebase {
  
      /**
       * Initialises Firebase
       */
      static init() {
          firebase.initializeApp({
            apiKey: "AIzaSyAHIPybho8Lvnm1ceLdQwySv5ggTyqFWtQ",
            authDomain: "patient-tracker-app-6a73b.firebaseapp.com",
            databaseURL: "https://patient-tracker-app-6a73b.firebaseio.com",
            storageBucket: "patient-tracker-app-6a73b.appspot.com",
          });
      }
  
  }
    
module.exports = Firebase