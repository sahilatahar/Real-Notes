import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./reducers/notesSlice";

export default configureStore({
    reducer: {
        notes: notesReducer,
    },
});
