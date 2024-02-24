import { useState, useEffect, useContext } from "react";
import Loading from "../components/Loading";
import AuthContext from "../context/AuthContext";
import UserAuth from "../firebase/UserAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function AuthRedirect({ component: Component, ...rest }) {
    const [loading, setLoading] = useState(true);
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            onAuthStateChanged(UserAuth.auth, async (user) => {
                if (user) {
                    setAuthState((data) => {
                        return { ...data, isAuthenticated: true };
                    });
                    navigate("/");
                } else {
                    setAuthState((data) => {
                        return { ...data, isAuthenticated: false };
                    });
                }
                setLoading(false);
            });
        }
    }, [authState.isAuthenticated, setAuthState, navigate]);

    return loading ? <Loading /> : <Component {...rest} />;
}

AuthRedirect.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default AuthRedirect;
