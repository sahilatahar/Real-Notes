import { useDispatch, useSelector } from "react-redux";
import { selectUser, setTheme } from "../app/reducers/userSlice";
import User from "../firebase/User";

function useTheme() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const toggleTheme = async () => {
        if (user.theme === "dark") {
            document.documentElement.classList.remove("dark");
            dispatch(setTheme("light"));
            localStorage.setItem("theme", "light");
            await User.updateTheme("light");
            return;
        } else {
            document.documentElement.classList.add("dark");
            dispatch(setTheme("dark"));
            localStorage.setItem("theme", "dark");
            await User.updateTheme("dark");
        }
    };

    return { toggleTheme };
}

export default useTheme;
