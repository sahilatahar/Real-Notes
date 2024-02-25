import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import es from "./locales/es.json";
import ar from "./locales/ar.json";

const resources = {
    en: {
        translation: en,
    },
    hi: {
        translation: hi,
    },
    es: {
        translation: es,
    },
    ar: {
        translation: ar,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        // Allow object
        fallbackLng: "en",
        returnObjects: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
