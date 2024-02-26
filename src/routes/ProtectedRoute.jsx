import { Navigate } from "react-router-dom";
import UserAuth from "../firebase/UserAuth";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { LoadingFull } from "../components/Loading";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotes,
    selectNotesAndStarredNotes,
} from "../app/reducers/notesSlice";

function ProtectedRoute({ component: Component, ...rest }) {
    const { authState, setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const { notes } = useSelector(selectNotesAndStarredNotes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            onAuthStateChanged(UserAuth.auth, async (user) => {
                if (user) {
                    setAuthState((data) => {
                        return { ...data, isAuthenticated: true };
                    });
                } else {
                    setAuthState((data) => {
                        return { ...data, isAuthenticated: false };
                    });
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [authState.isAuthenticated, setAuthState]);

    useEffect(() => {
        if (authState.isAuthenticated && !loading && !notes.length) {
            dispatch(fetchNotes());
        }
    }, [dispatch, notes.length, authState.isAuthenticated, loading]);

    if (loading) {
        return <LoadingFull />;
    }

    return authState.isAuthenticated ? (
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
