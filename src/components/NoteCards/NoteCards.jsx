import { useContext } from "react";
import { useSelector } from "react-redux";
import { selectNotesAndStarredNotes } from "../../app/reducers/notesSlice";
import TabContext from "../../context/TabContext";
import { sortNotes } from "../../utils/sortUitls";
import NoNotesFound from "../NoNotesFound";
import NoteCard from "./NoteCard";
import Loading from "../Loading";

function NoteCards() {
    const { notes, starredNotes } = useSelector(selectNotesAndStarredNotes);
    const status = useSelector((state) => state.notes.status);
    const { isStarredTab } = useContext(TabContext);

    if (status === "loading") {
        return <Loading />;
    }

    if (notes.length === 0 || (isStarredTab && starredNotes.length === 0)) {
        return <NoNotesFound />;
    }

    return (
        <div className="cards-grid items-starts justify-center py-4 sm:flex-row md:items-stretch">
            {sortNotes(!isStarredTab ? notes : starredNotes).map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
}

export default NoteCards;
