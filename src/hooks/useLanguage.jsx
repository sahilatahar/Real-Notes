import i18next from "i18next";
import { useDispatch } from "react-redux";
import { setLanguage } from "../app/reducers/userSlice";
import User from "../firebase/User";

function useLanguage() {
    const dispatch = useDispatch();

    const changeLanguage = async (code) => {
        i18next.changeLanguage(code);
        dispatch(setLanguage(code));
        await User.updateLanguage(code);
    };
    return { changeLanguage };
}

export default useLanguage;
