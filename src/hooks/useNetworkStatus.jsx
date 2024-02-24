import { useEffect } from "react";
import { dismissToast, showToast } from "../utils/toast";

function useNetworkStatus() {
    useEffect(() => {
        const handleOffline = () => {
            dismissToast();
            showToast(
                "error",
                "You are offline. Please ensure you are connected to the internet.",
            );
        };

        const handleOnline = () => {
            dismissToast();
            showToast("success", "You are back online.");
        };
        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);
}

export default useNetworkStatus;
