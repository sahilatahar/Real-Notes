import FirebaseNote from "../../firebase/FirebaseNote";
import { dismissToast, showToast } from "../../utils/toast";
import { addNote, deleteNote, updateNote, updateNoteStar } from "./notesSlice";

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
export const deleteNoteAction = async (id, dispatch) => {
    try {
        await FirebaseNote.deleteNote(id);
        dispatch(deleteNote(id));
        dismissToast();
        showToast("success", "Note deleted successfully");
    } catch (error) {
        dismissToast();
        showToast("error", "Note delete error!");
        console.log(error);
    }
    return false;
};
