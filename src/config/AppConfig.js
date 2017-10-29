import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAHIPybho8Lvnm1ceLdQwySv5ggTyqFWtQ",
  authDomain: "patient-tracker-app-6a73b.firebaseapp.com",
  databaseURL: "https://patient-tracker-app-6a73b.firebaseio.com",
  projectId: "patient-tracker-app-6a73b",
  storageBucket: "patient-tracker-app-6a73b.appspot.com",
  messagingSenderId: "938207442132"
};
// Initialize the firebase app here and pass it to other components as needed. Only initialize on startup.
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;