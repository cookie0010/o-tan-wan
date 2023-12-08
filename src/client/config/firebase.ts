import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from '@firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyAOrHBdkQ_Rq5pxEIb-I7Eqn-R58P5UtRY",
	authDomain: "test-firebase-app-11935.firebaseapp.com",
	projectId: "test-firebase-app-11935",
	storageBucket: "test-firebase-app-11935.appspot.com",
	messagingSenderId: "430167974006",
	appId: "1:430167974006:web:a7b61f202c19f2bf387f57",
	measurementId: "G-24E0CG4TL9"
};

export const firebaseApp =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const db = getDatabase(firebaseApp);
