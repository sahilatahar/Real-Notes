import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (type, message) => {
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "loading":
            toast.loading(message);
            break;
        case "info":
            toast.info(message);
            break;
        default:
            break;
    }
};

const dismissToast = () => {
    toast.dismiss();
};

export { showToast, dismissToast };
