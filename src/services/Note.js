import { toast } from 'react-toastify';
import FirebaseNote from '../services/firebase';

class Note {
    constructor() {
        this.firebase = new FirebaseNote();
    }
    addNote = async (email, note) => {
        try {
            toast.dismiss();
            toast.success('Note added successfully', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            let docRef = await this.firebase.addNote(email, note);

            await this.firebase.updateNote(email, docRef.id, { id: docRef.id, ...note });
            // console.log("Notes added success", docRef.id);
            return true;
        } catch (error) {
            toast.dismiss();
            toast.error("Note adding error!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        return false;
    }
    updateNote = async (email, id, note) => {
        try {
            toast.dismiss();
            toast.success('Note updated successfully', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            await this.firebase.updateNote(email, id, note);
            return true;
        } catch (error) {
            toast.dismiss();
            toast.error("Note update error!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            console.log(error);
        }
        return false;
    }
    getNotes = async (email) => {
        return await this.firebase.getNotes(email);
    }
    getNote = async (email, id) => {
        return await this.firebase.getNote(email, id);
    }

    handleNoteStar = async (email, id, note) => {
        let { starred } = note;
        toast.dismiss();
        toast.success(`Note ${starred ? 'remove from starred' : 'mark as starred'}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
        await this.firebase.updateNote(email, id, { ...note, starred: !starred });
    }

    deleteNote = async (email, id) => {
        toast.dismiss();
        toast.success('Note deleted successfully', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
        try {
            await this.firebase.deleteNote(email, id);
            return true;
        } catch (error) {
            toast.dismiss();
            toast.error("Note delete error!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            console.log(error);
        }
        return false;
    }
}

export default new Note();



