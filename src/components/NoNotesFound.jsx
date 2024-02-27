import { useContext } from "react";
import noNotesImg from "../assets/noNotes.svg";
import TabContext from "../context/TabContext";
import { useTranslation } from "react-i18next";
import { useSearch } from "../context/SearchContext";

function NoNotesFound() {
    const { searchQuery } = useSearch();
    const { isStarredTab } = useContext(TabContext);
    const { t } = useTranslation();
    const {
        noNotes,
        noStarredNotes,
        noSearchNotes,
        noSearchStarredNotes,
        noDeletedNotes,
    } = t("Notes").label;
    const isDeletedPage = window.location.pathname === "/deleted";

    const getLabel = () => {
        if (isDeletedPage) {
            return noDeletedNotes;
        }

        if (searchQuery.length > 0) {
            return !isStarredTab ? noSearchNotes : noSearchStarredNotes;
        }
        return !isStarredTab ? noNotes : noStarredNotes;
    };

    return (
        <div className="m-auto my-8 w-full text-center sm:w-[350px]">
            <img src={noNotesImg} alt="" />
            <h2 className="text-lg font-semibold">{getLabel()}</h2>
        </div>
    );
}

export default NoNotesFound;
