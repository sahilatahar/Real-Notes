import { Navigate } from "react-router-dom";
import UserAuth from "../firebase/UserAuth";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ component: Component, ...rest }) {
    const { authState, setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <Loading />;
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
