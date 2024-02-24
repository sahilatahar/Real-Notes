import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { firestore } from "./";
import UserAuth from "./UserAuth";

class FirebaseNote {
    addNote = async (note) => {
        const notesCollection = collection(firestore, UserAuth.uid);
        return await addDoc(notesCollection, note);
    };
    updateNote = async (id, note) => {
        const docRef = doc(firestore, UserAuth.uid, id);
        return await updateDoc(docRef, note);
    };
    getNotes = async () => {
        const notesCollection = collection(firestore, UserAuth.uid);
        return await getDocs(notesCollection).then((querySnapshot) => {
            let notes = [];
            querySnapshot.forEach((doc) => {
                notes.push(doc.data());
            });
            return notes;
        });
    };
    getNote = async (id) => {
        return (await getDoc(doc(firestore, UserAuth.uid, id))).data();
    };
    deleteNote = async (id) => {
        return await deleteDoc(doc(firestore, UserAuth.uid, id));
    };
}

export default new FirebaseNote();
