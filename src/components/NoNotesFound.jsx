import { useContext } from "react";
import noNotesImg from "../assets/noNotes.svg";
import TabContext from "../context/TabContext";
import { useTranslation } from "react-i18next";

function NoNotesFound() {
    const { isStarredTab } = useContext(TabContext);
    const { t } = useTranslation();
    const { noNotes, noStarredNotes } = t("Notes").label;

    return (
        <div className="m-auto my-8 w-full text-center sm:w-[350px]">
            <img src={noNotesImg} alt="" />
            <h2 className="text-lg font-semibold">
                {isStarredTab ? noStarredNotes : noNotes}
            </h2>
        </div>
    );
}

export default NoNotesFound;
