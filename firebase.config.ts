import {initializeApp} from "firebase/app";
import {getAuth, getReactNativePersistence, initializeAuth} from "@firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDKb0e_bToEnEf1blh1w791gBvUXm3eVQU",
  authDomain: "llamatracker-6208b.firebaseapp.com",
  projectId: "llamatracker-6208b",
  storageBucket: "llamatracker-6208b.appspot.com",
  messagingSenderId: "755999397313",
  appId: "1:755999397313:web:5a68285bcf3153a3fa4b40"
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  }
);

// Connection to Data base
// const db = getFirestore(app)

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
