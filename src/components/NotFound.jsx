import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const { t } = useTranslation();
    const { title, description } = t("NotFound");
    const navigate = useNavigate();

    const handleBtnClick = () => {
        navigate("/");
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center px-4">
            <div className="flex flex-col items-center gap-5">
                <h1 className="text-center text-3xl font-bold text-primary sm:text-5xl">
                    {title}
                </h1>
                <p className="pb-4 text-center text-lg font-medium sm:pb-8 sm:text-2xl">
                    {description}
                </p>
                <button className="button" onClick={handleBtnClick}>
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default NotFound;
