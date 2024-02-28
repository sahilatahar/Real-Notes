import { ToastContainer, Slide } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { TabProvider } from "./context/TabContext";
import useNetworkStatus from "./hooks/useNetworkStatus";
import { SearchProvider } from "./context/SearchContext";

function App() {
    useNetworkStatus();
    return (
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
    );
}

export default App;
