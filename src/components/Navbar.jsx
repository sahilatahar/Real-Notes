import { useSelector } from "react-redux";
import { selectNotesAndStarredNotes } from "../app/reducers/notesSlice";
import { useTranslation } from "react-i18next";
import { useSearch } from "../context/SearchContext";
import getSearchedNotes from "../helpers/getSearchedNotes";
import { useTabs } from "../context/TabContext";

function Navbar() {
    const { searchQuery } = useSearch();
    const { notes, starredNotes } = useSelector(selectNotesAndStarredNotes);
    const { filteredNotes, filteredStarredNotes } =
        getSearchedNotes(notes)(searchQuery);
    const { isStarredTab, setIsStarredTab } = useTabs();
    const { t } = useTranslation();
    const { all, starred } = t("Home.tabs");
    const { search } = t("Home").label;
    const { setSearchQuery } = useSearch();

    const handleOnChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTabs = (e) => {
        const name = e.target.getAttribute("data-name");
        if (name === "starred") {
            setIsStarredTab(true);
        } else {
            setIsStarredTab(false);
        }
    };

    // Get the count of all and starred notes
    const getCounts = () => {
        if (searchQuery.length > 0) {
            return {
                allCount: filteredNotes.length,
                starredCount: filteredStarredNotes.length,
            };
        }
        return {
            allCount: notes.length,
            starredCount: starredNotes.length,
        };
    };

    const getClassNames = (isSTab = false) =>
        `cursor-pointer p-2 font-bold border-b border-b-2 space-x-2 ${
            isSTab === isStarredTab
                ? "border-black dark:border-white"
                : "border-bgLight dark:border-bgDark"
        }`;

    const { allCount, starredCount } = getCounts();

    return (
        <nav className="sticky top-0 z-20 flex select-none flex-col gap-2 bg-bgLight pt-4 text-base dark:bg-bgDark md:flex-row md:items-center md:justify-between md:py-2 md:text-lg">
            <input
                type="search"
                className="input-style self-center py-2 md:order-1 md:w-1/2 lg:w-1/3"
                placeholder={search}
                onChange={handleOnChange}
                value={searchQuery}
            />
            <div className="min-w-fit space-x-2 md:space-x-4">
                <button className={getClassNames()} onClick={handleTabs}>
                    <span>{all}</span>
                    <span style={{ unicodeBidi: "embed" }}>({allCount})</span>
                </button>
                <button
                    className={getClassNames(true)}
                    onClick={handleTabs}
                    data-name="starred"
                >
                    <span data-name="starred">{starred}</span>
                    <span style={{ unicodeBidi: "embed" }}>
                        ({starredCount})
                    </span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
