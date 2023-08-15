import { doc, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from "../services/firebase";

class FirebaseNote {
    constructor() {
        this.uid = localStorage.getItem('userID');
    }
    addNote = async (note) => {
        const notesCollection = collection(firestore, this.uid);
        return await addDoc(notesCollection, note);
    }
    updateNote = async (id, note) => {
        const docRef = doc(firestore, this.uid, id);
        return await updateDoc(docRef, note);
    }
    getNotes = async () => {
        if (this.uid === null) {
            this.uid = localStorage.getItem('userID');
        }
        console.log(this.uid)
        const notesCollection = collection(firestore, this.uid);
        return await getDocs(notesCollection).then((querySnapshot) => {
            let notes = [];
            querySnapshot.forEach((doc) => {
                notes.push(doc.data());
            });
            return notes;
        });
    }
    getNote = async (id) => {
        return (await getDoc(doc(firestore, this.uid, id))).data();
    }
    deleteNote = async (id) => {
        return await deleteDoc(doc(firestore, this.uid, id));
    }
}

export default new FirebaseNote();
