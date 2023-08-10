import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
    "apiKey": "YOUR_API_KEY",
    "authDomain": "YOUR_AUTH_DOMAIN",
    "projectId": "YOUR_PROJECT_ID",
    "storageBucket": "YOUR_STORAGE_BUCKET",
    "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
    "appId": "YOUR_APP_ID"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class FirebaseNote {
    addNote = async (email, note) => {
        const notesCollection = collection(db, email);
        return addDoc(notesCollection, note);
    }
    updateNote = async (email, id, note) => {
        const docRef = doc(db, email, id);
        return updateDoc(docRef, note);
    }
    getNotes = async (email) => {
        const notesCollection = collection(db, email);
        return getDocs(notesCollection);
    }
    getNote = async (email, id) => {
        return (await getDoc(doc(db, email, id))).data();
    }
    deleteNote = async (email, id) => {
        return deleteDoc(doc(db, email, id));
    }
}

export { app, db };
export default FirebaseNote;

