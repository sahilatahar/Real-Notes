import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingFull } from "../components/Loading";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../app/reducers/notesSlice";
import {
    fetchUserData,
    setAuthState,
    setUserData,
} from "../app/reducers/userSlice";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import i18next from "i18next";

function ProtectedRoute({ component: Component, ...rest }) {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(fetchNotes());
                dispatch(fetchUserData());
                dispatch(setAuthState(true));
            } else {
                dispatch(setAuthState(false));
            }
            setLoading(false);
        });
    }, [dispatch]);

    // Update theme and language from local storage
    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        const lang = localStorage.getItem("i18nextLng") || "en";
        i18next.changeLanguage(lang);
        dispatch(setUserData({ theme, lang }));
    }, [dispatch]);

    // Update theme and language after user is fetched
    useEffect(() => {
        if (user !== null) {
            i18next.changeLanguage(user.lang);
            localStorage.setItem("i18nextLng", user.lang);
            if (user.theme === "dark") {
                document.documentElement.classList.add("dark");
            }
            localStorage.setItem("theme", user.theme);
        }
    }, [user]);

    if (loading) {
        return <LoadingFull />;
    }

    return isAuthenticated ? (
        <div className="flex">
            <Sidebar />
            <Component {...rest} />
        </div>
    ) : (
        <Navigate to="/login" />
    );
}

ProtectedRoute.propTypes = {
    component: PropTypes.any,
};

export default ProtectedRoute;
