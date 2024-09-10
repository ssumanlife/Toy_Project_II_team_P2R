import { initializeApp } from 'firebase/app';
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
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

// eslint-disable-next-line import/prefer-default-export
export { db };
