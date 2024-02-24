import { House, List, Plus, SignOut, Sun, User } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserAuth from "../firebase/UserAuth";
import useTheme from "../hooks/useTheme";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Sidebar = () => {
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);
    const { isMobile } = useWindowDimensions();
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
    const { toggleTheme } = useTheme();

    const signOut = async () => {
        let isSignOut = await UserAuth.signOut();
        if (isSignOut) {
            setAuthState((data) => {
                return { ...data, isAuthenticated: false };
            });
        }
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        {
            icon: <House size="30" />,
            label: "Home",
            onClick: () => navigate("/"),
        },
        {
            icon: <User size="30" />,
            label: "Profile",
            onClick: () => navigate("/profile"),
        },
        {
            icon: <Sun size="30" />,
            label: "Theme",
            onClick: toggleTheme,
        },
    ];

    // Hide Google Translate Element when Sidebar is closed
    useEffect(() => {
        const googleTranslateElement = document.getElementById(
            "google_translate_element",
        );
        if (isSidebarOpen && !isMobile) {
            googleTranslateElement.style.display = "block";
        } else {
            googleTranslateElement.style.display = "none";
        }
    }, [isSidebarOpen, isMobile]);

    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

    return (
        <aside
            className="fixed bottom-0 left-0 z-30 flex w-full select-none justify-between border-r-2 border-t-2 border-t-cardLight bg-bgLight px-4 dark:border-darkHover dark:border-t-cardDark dark:bg-bgDark sm:border-lightHover sm:bg-bgLight md:static md:h-screen md:flex-col md:justify-start md:p-0 md:pb-4"
            style={
                !isMobile
                    ? {
                          width: isSidebarOpen ? "300px" : "50px",
                          minWidth: isSidebarOpen ? "300px" : "50px",
                          padding: isSidebarOpen ? "1rem" : "1rem 0",
                      }
                    : {}
            }
        >
            {/* Add button only for mobile devices */}
            {isMobile && (
                <button
                    className={`sidebar-item ${
                        !isSidebarOpen ? "justify-center px-0" : ""
                    }`}
                    onClick={() => navigate("/new")}
                >
                    <Plus size="30" />
                </button>
            )}
            <section>
                {!isMobile && (
                    <div className="mb-2 flex h-[50px] w-full items-center justify-center">
                        {isSidebarOpen && (
                            <h1
                                className="mr-auto cursor-pointer text-2xl font-bold"
                                onClick={() => navigate("/")}
                            >
                                Real Notes
                            </h1>
                        )}
                        <button onClick={handleSidebarToggle}>
                            <List size={32} />
                        </button>
                    </div>
                )}
                <div className="flex flex-row gap-8 md:flex-col md:gap-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className={`sidebar-item ${
                                !isSidebarOpen ? "justify-center px-0" : ""
                            }`}
                            onClick={item.onClick}
                        >
                            {item.icon}
                            {isSidebarOpen && !isMobile && (
                                <span>{item.label}</span>
                            )}
                        </button>
                    ))}
                </div>
            </section>
            <button
                className={`sidebar-item mt-auto ${
                    !isSidebarOpen ? "justify-center px-0" : ""
                }`}
                onClick={signOut}
            >
                <SignOut size="30" />
                {isSidebarOpen && <span>Log out</span>}
            </button>
        </aside>
    );
};

export default Sidebar;
