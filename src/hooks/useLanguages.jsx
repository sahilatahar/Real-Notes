import { useEffect, useState } from "react";
import i18next from "i18next";

function useLanguages() {
    const [currentLang, setCurrentLang] = useState("en");

    useEffect(() => {
        i18next.changeLanguage(currentLang);
    }, [currentLang]);

    return { currentLang, setCurrentLang };
}

export default useLanguages;
