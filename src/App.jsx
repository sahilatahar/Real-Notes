import { ToastContainer, Slide } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { TabProvider } from "./context/TabContext";
import { ThemeProvider } from "./context/ThemeContext";
import useNetworkStatus from "./hooks/useNetworkStatus";
import { SearchProvider } from "./context/SearchContext";

function App() {
    useNetworkStatus();
    return (
        <ThemeProvider>
            <AuthProvider>
                <TabProvider>
                    <SearchProvider>
                        <RouterProvider router={routes} />
                    </SearchProvider>
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
