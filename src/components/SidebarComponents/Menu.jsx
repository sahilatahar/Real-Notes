import {
    DotsThreeOutlineVertical,
    SignOut,
    Trash,
} from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Menu({ signOut }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { btnLabel } = t("Sidebar");
    const menuRef = useRef(null);

    const menuItems = [
        {
            label: btnLabel.deletedNotes,
            icon: <Trash size={30} />,
            onClick: () => navigate("/deleted"),
        },
        {
            label: btnLabel.logout,
            icon: <SignOut size={30} />,
            onClick: signOut,
        },
    ];

    const toggleMenu = (e) => {
        const isMenuButton = e.target.dataset.label === "menu-button";
        if (!isMenuButton) {
            menuRef.current.classList.add("hidden");
        } else {
            menuRef.current.classList.toggle("hidden");
        }
    };

    useEffect(() => {
        document.addEventListener("click", toggleMenu);
        return () => document.removeEventListener("click", toggleMenu);
    }, []);

    return (
        <div className="relative flex aspect-square items-center md:hidden">
            <button data-label="menu-button">
                <DotsThreeOutlineVertical size={26} data-label="menu-button" />
            </button>
            <div
                className="absolute right-0 top-0 hidden w-[70vw] -translate-y-full rounded-lg bg-cardLight p-2 shadow-lg dark:border dark:border-textDark dark:bg-cardDark"
                ref={menuRef}
            >
                {menuItems.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className="flex w-full items-center p-2 text-left"
                            onClick={item.onClick}
                        >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

Menu.propTypes = {
    signOut: PropTypes.func.isRequired,
};

export default Menu;
