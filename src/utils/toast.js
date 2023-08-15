import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            break;
        case 'error':
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            break;
        case 'loading':
            toast.loading(message, {
                position: toast.POSITION.TOP_CENTER,
            });
            break;
        case 'info':
            toast.info(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            break;
        default:
            break;
    }
}

const dismissToast = () => {
    toast.dismiss();
}

export { showToast, dismissToast };