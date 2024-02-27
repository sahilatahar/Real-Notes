import { useContext } from "react";
import { useSelector } from "react-redux";
import {
    selectDeletedNotes,
    selectNotesAndStarredNotes,
} from "../../app/reducers/notesSlice";
import TabContext from "../../context/TabContext";
import { sortNotes } from "../../utils/sortUtils";
import NoNotesFound from "../NoNotesFound";
import NoteCard from "./NoteCard";
import Loading from "../Loading";
import { useSearch } from "../../context/SearchContext";
import getSearchedNotes from "../../helpers/getSearchedNotes";

function NoteCards() {
    const { searchQuery } = useSearch();
    const { notes, starredNotes } = useSelector(selectNotesAndStarredNotes);
    const { deletedNotes } = useSelector(selectDeletedNotes);
    const { filteredNotes, filteredStarredNotes } =
        getSearchedNotes(notes)(searchQuery);
    const status = useSelector((state) => state.notes.status);
    const { isStarredTab } = useContext(TabContext);
    const isDeletedPage = window.location.pathname.includes("deleted");

    // Show loading if notes are loading
    if (status === "loading") {
        return <Loading />;
    }

    // Conditions for no notes found
    const noNotes = notes.length === 0;
    const noStarredNotes = isStarredTab && starredNotes.length === 0;
    const noSearchedNotes =
        searchQuery.length > 0 && filteredNotes.length === 0;
    const noSearchedStarredNotes =
        isStarredTab &&
        searchQuery.length > 0 &&
        filteredStarredNotes.length === 0;
    const noDeletedNotes = isDeletedPage && deletedNotes.length === 0;

    const noNotesCondition =
        (!isDeletedPage &&
            (noNotes ||
                noStarredNotes ||
                noSearchedNotes ||
                noSearchedStarredNotes)) ||
        noDeletedNotes;

    if (noNotesCondition) {
        return <NoNotesFound />;
    }

    // Get notes based on search query and starred tab
    const getNotes = () => {
        if (isDeletedPage) return deletedNotes;

        if (searchQuery.length > 0) {
            return !isStarredTab ? filteredNotes : filteredStarredNotes;
        }
        return !isStarredTab ? notes : starredNotes;
    };

    return (
        <div className="cards-grid items-starts justify-center pb-8 pt-4 sm:flex-row md:items-stretch">
            {sortNotes(getNotes()).map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
}

export default NoteCards;
