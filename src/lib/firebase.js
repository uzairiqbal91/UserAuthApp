import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAwtbOmlOTQwT_qfbybDhn-Li7YCy6gRMs",
  appId: "1:75068508417:android:436b3dc5cc0630e8077300",
  projectId: "user-authenitication",
  storageBucket: "user-authenitication.firebasestorage.app",
  messagingSenderId: "75068508417",
};

console.log('🔥 Firebase apps:', firebase.apps);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;