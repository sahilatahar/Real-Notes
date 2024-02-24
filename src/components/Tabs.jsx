import { useContext } from "react";
import { useSelector } from "react-redux";
import { selectNotesAndStarredNotes } from "../app/redux/notesSlice";
import TabContext from "../context/TabContext";

function Tabs() {
    const { notes, starredNotes } = useSelector(selectNotesAndStarredNotes);
    const { isStarredTab, setIsStarredTab } = useContext(TabContext);

    const handleTabs = (e) => {
        const name = e.target.getAttribute("data-name");
        if (name === "starred") {
            setIsStarredTab(true);
        } else {
            setIsStarredTab(false);
        }
    };

    const getClassNames = (isSTab = false) =>
        `cursor-pointer p-2 font-bold border-b border-b-2 ${
            isSTab === isStarredTab
                ? "border-black dark:border-white"
                : "border-bgLight dark:border-bgDark"
        }`;

    return (
        <nav className="sticky flex select-none gap-4 pl-4 text-base md:text-lg">
            <button className={getClassNames()} onClick={handleTabs}>
                All ({notes.length})
            </button>
            <button
                className={getClassNames(true)}
                onClick={handleTabs}
                data-name="starred"
            >
                Starred ({starredNotes.length})
            </button>
        </nav>
    );
}

export default Tabs;
