import FirebaseNote from "../../firebase/FirebaseNote";
import { dismissToast, showToast } from "../../utils/toast";
import {
    addNote,
    deleteNote,
    updateNote,
    updateNoteStar,
} from "../reducers/notesSlice";
import { sortNotes } from "../../utils/sortUtils";

export const addNoteAction = async (note, dispatch) => {
    showToast("loading", "Adding note...");
    try {
        let docRef = await FirebaseNote.addNote(note);
        const updatedNote = { id: docRef.id, ...note };
        await FirebaseNote.updateNote(docRef.id, updatedNote);
        dispatch(addNote(updatedNote));
        dismissToast();
        showToast("success", "Note added successfully");
        return true;
    } catch (error) {
        dismissToast();
        showToast("error", "Note adding error!");
        console.log(error);
    }
    return false;
};
export const updateNoteAction = async (note, dispatch) => {
    showToast("loading", "Updating note...");
    const { id } = note;
    try {
        await FirebaseNote.updateNote(id, note);
        dispatch(updateNote(note));
        dismissToast();
        showToast("success", "Note updated successfully");
        return true;
    } catch (error) {
        dismissToast();
        showToast("error", "Note update error!");
        console.log(error);
    }
};
export const updateNoteStarAction = async (note, dispatch) => {
    const { id, starred } = note;
    const updatedNote = { ...note, starred: !starred };
    try {
        await FirebaseNote.updateNote(id, updatedNote);
        dispatch(updateNoteStar(updatedNote));
        dismissToast();
        showToast(
            "success",
            `Note ${starred ? "remove from starred" : "mark as starred"}`,
        );
    } catch (e) {
        dismissToast();
        showToast("error", "Note starred error!");
        console.log(e);
    }
};

export const deleteNoteAction = async ({ note, dispatch, deletedNotes }) => {
    showToast("loading", "Deleting note...");
    const updatedNote = { ...note, deleted: true };
    try {
        await FirebaseNote.updateNote(note.id, updatedNote);
        await checkDeletedNotesThreshold({ deletedNotes, dispatch });
        dispatch(updateNote(updatedNote));
        dismissToast();
        showToast("success", "Note deleted successfully");
    } catch (error) {
        dismissToast();
        showToast("error", "Note delete error!");
        console.log(error);
    }
    return false;
};

export const permanentlyDeleteNoteAction = async (
    note,
    dispatch,
    toast = true,
) => {
    if (toast) {
        showToast("loading", "Deleting note...");
    }
    try {
        await FirebaseNote.deleteNote(note.id);
        dispatch(deleteNote(note.id));
        dismissToast();
        if (toast) {
            showToast("success", "Note deleted permanently");
        }
    } catch (error) {
        if (toast) {
            dismissToast();
            showToast("error", "Note delete error!");
        }
        console.log(error);
    }
    return false;
};

// Function to check if the number of deleted notes exceeds the threshold
const checkDeletedNotesThreshold = async ({ deletedNotes, dispatch }) => {
    const DELETED_NOTES_THRESHOLD = 50;
    const deletedNotesCount = deletedNotes.length;
    if (deletedNotesCount > DELETED_NOTES_THRESHOLD) {
        const oldestDeletedNote =
            sortNotes(deletedNotes)[deletedNotes.length - 1];
        await permanentlyDeleteNoteAction(oldestDeletedNote, dispatch, false);
    }
};

export const restoreNoteAction = async (note, dispatch) => {
    const updatedNote = { ...note, deleted: false };
    try {
        await FirebaseNote.updateNote(note.id, updatedNote);
        dispatch(updateNote(updatedNote));
        dismissToast();
        showToast("success", "Note restored successfully");
    } catch (error) {
        dismissToast();
        showToast("error", "Note restore Failed!");
        console.log(error);
    }
};
