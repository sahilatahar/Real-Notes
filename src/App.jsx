import { ToastContainer, Slide } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { TabProvider } from "./context/TabContext";
import { ThemeProvider } from "./context/ThemeContext";
import useNetworkStatus from "./hooks/useNetworkStatus";

function App() {
    useNetworkStatus();
    return (
        <ThemeProvider>
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
        </ThemeProvider>
    );
}

export default App;
