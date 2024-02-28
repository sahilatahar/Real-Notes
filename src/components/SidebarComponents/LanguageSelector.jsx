import { useTranslation } from "react-i18next";
import languages from "../../utils/languages";
import useLanguage from "../../hooks/useLanguage";
import { selectUser } from "../../app/reducers/userSlice";
import { useSelector } from "react-redux";

function LanguageSelector() {
    const { t } = useTranslation();
    const { btnLabel } = t("Sidebar");
    const { changeLanguage } = useLanguage();
    const user = useSelector(selectUser);

    const handleLanguageChange = (e) => {
        changeLanguage(e.target.value);
    };

    return (
        <div className="space-y-2">
            <label htmlFor="language-select" className="px-3 text-base">
                {btnLabel.changeLang}
            </label>
            <select
                defaultValue={user.lang}
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

export default LanguageSelector;
