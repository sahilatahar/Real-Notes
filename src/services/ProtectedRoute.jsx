import { useNavigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NoteEditor from "../pages/NoteEditor/NoteEditor";
import Profile from "../pages/Profile/Profile";
import User from "../classes/User";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { showToast, dismissToast } from "../utils/toast";

function ProtectedRoute({ setIsLoginPage }) {

    const navigate = useNavigate();
    const { authState, setAuthState } = useContext(AuthContext);


    useEffect(() => {
        if (!authState.isAuthenticated) {
            (async () => {
                let isLoggedIn = await User.checkUserAuth();
                setAuthState(async (data) => {
                    return { ...data, isAuthenticated: isLoggedIn }
                });
                if (!isLoggedIn) {
                    navigate('/login');
                }
            })()
        }
    }, [authState.isAuthenticated]);


    useEffect(() => {
        const handleOffline = () => {
            dismissToast();
            showToast('error', 'You are offline. Please ensure you are connected to the internet.');
        };
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('offline', handleOffline);
        };
    }, []);



    const routes = useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login {...{ setIsLoginPage }} />,
        },
        {
            path: '/new',
            element: <NoteEditor isNewPage={true} />,
        },
        {
            path: '/edit/:id',
            element: <NoteEditor />,
        },
        {
            path: '/profile',
            element: <Profile />,
        },
        {
            path: '*',
            element: <Home />,
        }
    ]);

    return routes;
}

export default ProtectedRoute;