// src/lib/firebase.js
import firebase from '@react-native-firebase/app';

// Optional: only if you use firebaseConfig (not needed for auto init from google-services.json)


console.log('🔥 Firebase apps:', firebase.apps);
if (!firebase.apps.length) {
  firebase.initializeApp(); // auto-inits using google-services.json
}

export default firebase;