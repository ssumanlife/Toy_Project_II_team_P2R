import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface ImportMeta {
    readonly env: {
      readonly VITE_FIREBASE_DATABASE_URL: string;
      readonly VITE_FIREBASE_API_KEY: string;
      readonly VITE_FIREBASE_AUTH_DOMAIN: string;
      readonly VITE_FIREBASE_PROJECT_ID: string;
      readonly VITE_FIREBASE_STORAGE_BUCKET: string;
      readonly VITE_FIREBASE_MESSAGING_ID: string;
      readonly VITE_FIREBASE_APP_ID: string;
      readonly VITE_FIREBASE_MEASUREMENT_ID: string;
    };
  }
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const authService = getAuth();

export { authService, db };
