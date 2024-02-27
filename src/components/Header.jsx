import { useTranslation } from "react-i18next";

function Header() {
    const { t } = useTranslation();
    const { title } = t("Home");

    return (
        <header className="flex items-center justify-center pb-2 pt-8  md:py-10">
            <h1 className="text-4xl font-bold leading-10 md:text-6xl">
                {title}
            </h1>
        </header>
    );
}

export default Header;
