import { createContext, useState } from 'react';
import PropType from 'prop-types';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from './firebase';
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
    })

    useEffect(() => {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setAuthState({ isAuthenticated: true, user: user });
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
    children: PropType.node.isRequired
}

export { AuthContext };
export default AuthProvider;