import i18n from "i18next";
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

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "en",
        // Allow object
        returnObjects: true,
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
