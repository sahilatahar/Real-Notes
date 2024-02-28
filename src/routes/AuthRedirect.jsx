import { useEffect, useState } from "react";
import { LoadingFull } from "../components/Loading";
import UserAuth from "../firebase/UserAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../app/reducers/userSlice";

// This component is used to redirect the user to the home page if they are already authenticated.
function AuthRedirect({ component: Component, ...rest }) {
    const navigate = useNavigate();
    const { status, isAuthenticated } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(status === "loading");
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            onAuthStateChanged(UserAuth.auth, (user) => {
                if (user) {
                    dispatch(setAuthState(true));
                    navigate("/");
                } else {
                    dispatch(setAuthState(false));
                }
                setLoading(false);
            });
        }
    }, [isAuthenticated, navigate, dispatch]);

    return loading ? <LoadingFull /> : <Component {...rest} />;
}

AuthRedirect.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default AuthRedirect;
