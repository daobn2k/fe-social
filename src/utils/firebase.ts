// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAq7RQXS_JWjJug0MxdQ2Z3Zs1_Y8zHRBQ',
	authDomain: 'fe-social.firebaseapp.com',
	projectId: 'fe-social',
	storageBucket: 'fe-social.appspot.com',
	messagingSenderId: '374386191033',
	appId: '1:374386191033:web:7bc8f6aea7279be773c968',
	measurementId: 'G-RC4Z57DGF3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
