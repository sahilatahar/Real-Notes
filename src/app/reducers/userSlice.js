import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../firebase/User";

const initialState = {
    user: null,
    isAuthenticated: false,
    status: "loading",
};

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async () => {
        try {
            const userDetails = await User.getUserData();
            if (userDetails) {
                return userDetails;
            }
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
        return null;
    },
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action) {
            state.user = action.payload;
        },
        setAuthState(state, action) {
            state.isAuthenticated = action.payload;
        },
        setUserStatus(state, action) {
            state.status = action.payload;
        },
        setLanguage(state, action) {
            state.user.lang = action.payload;
        },
        setTheme(state, action) {
            state.user.theme = action.payload;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state.user = action.payload;
                state.status = "done";
            }
        });
        builder.addCase(fetchUserData.rejected, (state) => {
            state.status = "failed";
        });
        builder.addCase(fetchUserData.pending, (state) => {
            state.status = "loading";
        });
    },
});

export const {
    setUserData,
    setAuthState,
    setUserStatus,
    setLanguage,
    setTheme,
    logout,
} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectAuthState = (state) => state.user.isAuthenticated;
export const selectStatus = (state) => state.user.status;
export default userSlice.reducer;
