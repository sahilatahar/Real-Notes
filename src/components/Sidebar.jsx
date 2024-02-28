import {
    House,
    List,
    Moon,
    Plus,
    SignOut,
    Sun,
    Trash,
    User as UserIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, setAuthState } from "../app/reducers/userSlice";
import UserAuth from "../firebase/UserAuth";
import useWindowDimensions from "../hooks/useWindowDimensions";
import LanguageSelector from "./SidebarComponents/LanguageSelector";
import LanguageSelectorMobile from "./SidebarComponents/LanguageSelectorMobile";
import Menu from "./SidebarComponents/Menu";
import useTheme from "../hooks/useTheme";

const Sidebar = () => {
    const navigate = useNavigate();
    const { isMobile } = useWindowDimensions();
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
    const { t } = useTranslation();
    const { title, btnLabel } = t("Sidebar");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { toggleTheme } = useTheme();

    const signOut = async () => {
        let isSignOut = await UserAuth.signOut();
        if (isSignOut) {
            localStorage.removeItem("theme");
            localStorage.removeItem("i18nextLng");
            dispatch(setAuthState(false));
        }
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        {
            icon: <House size="30" />,
            label: btnLabel.home,
            onClick: () => navigate("/"),
        },
        {
            icon: <UserIcon size="30" />,
            label: btnLabel.profile,
            onClick: () => navigate("/profile"),
        },
        {
            icon: user.theme == "dark" ? <Moon size={30} /> : <Sun size={30} />,
            label: btnLabel.theme,
            onClick: toggleTheme,
        },
    ];

    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

    const sidebarItemClassName = `sidebar-item ${
        !isSidebarOpen ? "justify-center px-0" : ""
    }`;

    const sidebarConditionalClassNames = () =>
        isSidebarOpen
            ? "md:w-[300px] md:min-w-[300px] md:px-2"
            : "md:w-[50px] md:min-w-[50px] md:px-0";

    return (
        <aside
            className={
                "fixed bottom-0 left-0 z-30 flex w-full select-none justify-between border-r-2 border-t-2 border-t-cardLight bg-bgLight px-3 py-1 dark:border-darkHover dark:border-t-cardDark dark:bg-bgDark sm:border-lightHover sm:bg-bgLight md:static md:h-screen md:w-auto md:flex-col md:pb-4 " +
                sidebarConditionalClassNames()
            }
        >
            {/* Add button only for mobile devices */}
            <button
                className={sidebarItemClassName + " flex md:hidden"}
                onClick={() => navigate("/add")}
            >
                <Plus size="30" />
            </button>
            <section>
                <div className="mb-2 hidden h-[50px] w-full items-center justify-center px-2 pb-6 pt-10 md:flex">
                    {isSidebarOpen && (
                        <h1
                            className="mr-auto cursor-pointer text-2xl font-bold"
                            onClick={() => navigate("/")}
                        >
                            {title}
                        </h1>
                    )}
                    <button onClick={handleSidebarToggle}>
                        <List size={32} />
                    </button>
                </div>
                <div className="flex flex-row gap-8 md:flex-col md:gap-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className={sidebarItemClassName}
                            onClick={item.onClick}
                        >
                            {item.icon}
                            {isSidebarOpen && (
                                <span className="hidden md:inline">
                                    {item.label}
                                </span>
                            )}
                        </button>
                    ))}
                    {/* Change Language button only for mobile devices */}
                    <LanguageSelectorMobile />
                    {/* Deleted Notes Button for Desktop*/}
                    <button
                        className={sidebarItemClassName + " hidden md:flex"}
                        onClick={() => navigate("/deleted")}
                    >
                        <Trash size="30" />
                        {isSidebarOpen && <span>{btnLabel.deletedNotes}</span>}
                    </button>
                </div>
            </section>
            <section className="hidden flex-row gap-8 md:flex md:flex-col md:gap-2">
                {/* Language Select Option */}
                {isSidebarOpen && <LanguageSelector />}
                <button className={sidebarItemClassName} onClick={signOut}>
                    <SignOut size="30" />
                    {isSidebarOpen && <span>{btnLabel.logout}</span>}
                </button>
            </section>
            {/* Menu button for mobile devices */}
            <Menu signOut={signOut} />
        </aside>
    );
};

export default Sidebar;
