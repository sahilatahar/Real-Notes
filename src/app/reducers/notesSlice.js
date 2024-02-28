import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import FirebaseNote from "../../firebase/FirebaseNote";

const initialState = {
    notes: [],
    status: "loading",
};

const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    try {
        const notes = await FirebaseNote.getNotes();
        return notes;
    } catch (error) {
        console.log(error);
        return [];
    }
});

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote(state, action) {
            const note = action.payload;
            state.notes.push(note);
        },
        updateNote(state, action) {
            const note = action.payload;
            const { id } = note;

            state.notes = state.notes.map((n) => {
                if (n.id === id) {
                    return note;
                }
                return n;
            });
        },
        updateNoteStar(state, action) {
            const note = action.payload;
            const { id, starred } = note;

            state.notes = state.notes.map((note) => {
                if (note.id === id) {
                    note.starred = starred;
                }
                return note;
            });
        },
        deleteNote(state, action) {
            const id = action.payload;
            state.notes = state.notes.filter((note) => note.id !== id);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = "done";
            state.notes = action.payload;
        });
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});

export const selectNoteById = (state, noteId) =>
    state.notes.notes.find((note) => note.id === noteId);
const selectNotes = (state) => state.notes.notes;

export const selectNotesAndStarredNotes = createSelector(
    [selectNotes],
    (notes) => {
        notes = notes.filter((note) => !note.deleted);
        const starredNotes = notes.filter((note) => note.starred);
        return {
            notes,
            starredNotes,
        };
    },
);

export const selectDeletedNotes = createSelector([selectNotes], (notes) => {
    const deletedNotes = notes.filter((note) => note.deleted);
    return {
        deletedNotes,
    };
});

export const { addNote, updateNote, updateNoteStar, deleteNote } =
    notesSlice.actions;
export { fetchNotes };
export default notesSlice.reducer;
