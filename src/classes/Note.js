import { showToast, dismissToast } from '../utils/toast';
import FirebaseNote from './FirebaseNote';

class Note {
    constructor() {
        this.firebase = FirebaseNote;
    }
    addNote = async (note) => {
        try {
            dismissToast();
            showToast('success', 'Note added successfully');
            let docRef = await this.firebase.addNote(note);
            await this.firebase.updateNote(docRef.id, { id: docRef.id, ...note });
            // console.log("Notes added success", docRef.id);
            return true;
        } catch (error) {
            dismissToast();
            showToast('error', 'Note adding error!');
            console.log(error);
        }
        return false;
    }
    updateNote = async (id, note) => {
        try {
            dismissToast();
            showToast('success', 'Note updated successfully');
            await this.firebase.updateNote(id, note);
            return true;
        } catch (error) {
            dismissToast();
            showToast('error', 'Note update error!');
            console.log(error);
        }
        return false;
    }
    getNotes = async () => {
        return await this.firebase.getNotes();
    }
    getNote = async (id) => {
        return await this.firebase.getNote(id);
    }

    handleNoteStar = async (id, note) => {
        let { starred } = note;
        dismissToast();
        showToast('success', `Note ${starred ? 'remove from starred' : 'mark as starred'}`);
        await this.firebase.updateNote(id, { ...note, starred: !starred });
    }

    deleteNote = async (id) => {
        dismissToast();
        showToast('success', 'Note deleted successfully');
        try {
            await this.firebase.deleteNote(id);
            return true;
        } catch (error) {
            dismissToast();
            showToast('error', 'Note delete error!');
            console.log(error);
        }
        return false;
    }
}

export default new Note();



