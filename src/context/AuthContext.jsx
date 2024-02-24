import { getAuth } from "firebase/auth";
import PropType from "prop-types";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase";
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
    });

    useEffect(() => {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setAuthState({ isAuthenticated: true, user: null });
            } else {
                setAuthState({ isAuthenticated: false, user: null });
            }
        });
    }, [authState.isAuthenticated]);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropType.node.isRequired,
};

export { AuthProvider };
export default AuthContext;
