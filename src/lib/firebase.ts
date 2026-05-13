import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyDP6-rv4EpXBTuL0752KNT6x904As1KL6s',
	authDomain: 'd-filaments-84684.firebaseapp.com',
	databaseURL: 'https://d-filaments-84684-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'd-filaments-84684',
	storageBucket: 'd-filaments-84684.firebasestorage.app',
	messagingSenderId: '859813056522',
	appId: '1:859813056522:web:36e6f8333eb674b1318ff3',
	measurementId: 'G-E1ZXG6DX33',
};

export const isConfigured = !firebaseConfig.apiKey.startsWith('YOUR');

const app = isConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getDatabase(app) : null;
if (app) getAnalytics(app);
