import { useTranslation } from "react-i18next";
import languages from "../../utils/languages";
import PropTypes from "prop-types";

function LanguageSelector({ setCurrentLang }) {
    const { t } = useTranslation();
    const { btnLabel } = t("Sidebar");

    const handleLanguageChange = (e) => {
        const code = e.target.value;
        setCurrentLang(code);
    };

    return (
        <div className="space-y-2">
            <label htmlFor="language-select" className="px-3 text-base">
                {btnLabel.changeLang}
            </label>
            <select
                defaultValue="default"
                id="language-select"
                onChange={handleLanguageChange}
                className="sidebar-item w-full border-none outline-none"
            >
                {languages.map(({ name, code }) => {
                    return (
                        <option
                            key={code}
                            value={code}
                            className="min-w-[200px]"
                        >
                            {name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

LanguageSelector.propTypes = {
    setCurrentLang: PropTypes.func.isRequired,
};

export default LanguageSelector;
