import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCTi8d_tGOgbUOlKVc6cCReEzHzddSXd6A',
	authDomain: 'jmc-test-storage.firebaseapp.com',
	projectId: 'jmc-test-storage',
	storageBucket: 'jmc-test-storage.appspot.com',
	messagingSenderId: '698244180829',
	appId: '1:698244180829:web:aad5e0f459da87b37316b4',
	measurementId: 'G-FJCPQZNNEP',
};

export const firebaseApp =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);

export const storage = getStorage(firebaseApp);
