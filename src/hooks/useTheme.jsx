import { useEffect, useState } from "react";

function useTheme() {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        if (theme === "dark") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setTheme("light");
            return;
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        if (savedTheme) {
            document.documentElement.classList.add(savedTheme);
            setTheme(savedTheme);
        }
    }, []);

    return { toggleTheme, theme, setTheme };
}

export default useTheme;
