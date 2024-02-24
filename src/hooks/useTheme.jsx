import { useEffect } from "react";

function useTheme() {
    const toggleTheme = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            return;
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            document.documentElement.classList.add(theme);
        }
    }, []);

    return { toggleTheme };
}

export default useTheme;
