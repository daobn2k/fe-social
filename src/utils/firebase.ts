// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAuzAnir3t5hjj699bx3FKE-4LOVVmBdRo',
	authDomain: 'fire-base-storage-b5c8c.firebaseapp.com',
	projectId: 'fire-base-storage-b5c8c',
	storageBucket: 'fire-base-storage-b5c8c.appspot.com',
	messagingSenderId: '331190095350',
	appId: '1:331190095350:web:51aaaee4a9a7bb76098bd7',
	measurementId: 'G-W3S20E6HFF',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
