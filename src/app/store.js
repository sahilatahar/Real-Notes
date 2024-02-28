import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./reducers/notesSlice";
import userReducer from "./reducers/userSlice";

export default configureStore({
    reducer: {
        notes: notesReducer,
        user: userReducer,
    },
});
