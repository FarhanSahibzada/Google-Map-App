// firebase.config.ts
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY.trim(),
    authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN.trim(),
    projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID.trim(),
    storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET.trim(),
    messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID.trim(),
    appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID.trim(),
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
