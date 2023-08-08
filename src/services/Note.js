import { doc, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

class Note {
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

export default new Note();



