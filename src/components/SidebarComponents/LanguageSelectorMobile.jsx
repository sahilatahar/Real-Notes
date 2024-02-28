import { Globe } from "@phosphor-icons/react";
import languages from "../../utils/languages";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import useLanguage from "../../hooks/useLanguage";

function LanguageSelectorMobile() {
    const modalRef = useRef();
    const { t } = useTranslation();
    const { btnLabel } = t("Sidebar");
    const { changeLanguage } = useLanguage();

    const showModal = () => {
        modalRef.current.classList.remove("hidden");
        modalRef.current.classList.add("flex");
    };
    const hideModal = () => {
        modalRef.current.classList.remove("flex");
        modalRef.current.classList.add("hidden");
    };

    const handleLanguageChange = async (e) => {
        e.stopPropagation();
        const code = e.target.getAttribute("data-code");
        changeLanguage(code);
        hideModal();
    };

    const handleButtonClick = () => {
        showModal();
    };

    const handleOutsideClick = (e) => {
        e.stopPropagation();
        hideModal();
    };

    return (
        <>
            <button onClick={handleButtonClick} className="md:hidden">
                <Globe size="30" />
            </button>
            <div
                className="fixed left-0 top-0 z-20 hidden h-screen w-full items-center justify-center bg-bgLight dark:bg-bgDark"
                ref={modalRef}
                onClick={handleOutsideClick}
            >
                <div className="border-borderLight w-[90%] rounded-md border bg-cardLight px-4 py-6 text-textLight shadow-lg dark:border-textDark dark:bg-cardDark dark:text-textDark">
                    <h1 className="mb-4 border-b border-b-textLight pb-2 text-center text-xl dark:border-b-textDark">
                        {btnLabel.chooseLang}
                    </h1>
                    <ul>
                        {languages.map(({ name, code }) => {
                            return (
                                <li
                                    key={code}
                                    data-code={code}
                                    className="mb-3 w-full cursor-pointer text-center text-lg"
                                    onClick={handleLanguageChange}
                                >
                                    {name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default LanguageSelectorMobile;
