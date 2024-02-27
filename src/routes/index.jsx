import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NoteEditor from "../pages/NoteEditor";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";
import NoteDetails from "../pages/NoteDetails";
import DeletedNotes from "../pages/DeletedNotes";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute component={Home} />,
    },
    {
        path: "/login",
        element: <AuthRedirect component={Login} />,
    },
    {
        path: "/register",
        element: <AuthRedirect component={Register} />,
    },
    {
        path: "/add",
        element: <ProtectedRoute component={NoteEditor} isNew={true} />,
    },
    {
        path: "/notes/:id",
        element: <ProtectedRoute component={NoteDetails} />,
    },
    {
        path: "/edit/:id",
        element: <ProtectedRoute component={NoteEditor} />,
    },
    {
        path: "/deleted",
        element: <ProtectedRoute component={DeletedNotes} />,
    },
    {
        path: "/profile",
        element: <ProtectedRoute component={Profile} />,
    },
    {
        path: "*",
        element: <ProtectedRoute component={Home} />,
    },
]);

export default routes;
