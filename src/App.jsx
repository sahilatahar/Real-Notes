import { ToastContainer, Slide } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { TabProvider } from "./context/TabContext";
import useNetworkStatus from "./hooks/useNetworkStatus";

function App() {
    useNetworkStatus();
    return (
        <AuthProvider>
            <TabProvider>
                <RouterProvider router={routes} />
                <ToastContainer
                    transition={Slide}
                    position="top-right"
                    autoClose={2000}
                />
            </TabProvider>
        </AuthProvider>
    );
}

export default App;
