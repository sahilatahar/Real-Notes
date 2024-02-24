import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotes,
    selectNotesAndStarredNotes,
} from "../../app/redux/notesSlice";
import TabContext from "../../context/TabContext";
import { sortNotes } from "../../utils/sortUitls";
import NoNotesFound from "../NoNotesFound";
import NoteCard from "./NoteCard/NoteCard";

function NoteCards() {
    const { notes, starredNotes } = useSelector(selectNotesAndStarredNotes);
    const { isStarredTab } = useContext(TabContext);
    const dispatch = useDispatch();

    useEffect(() => {
        if (notes.length === 0) {
            dispatch(fetchNotes());
        }
    }, [dispatch, notes.length]);

    if (notes.length === 0 || (isStarredTab && starredNotes.length === 0)) {
        return <NoNotesFound />;
    }

    return (
        <div className="cards-grid w-full py-4 sm:flex-row">
            {sortNotes(!isStarredTab ? notes : starredNotes).map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
}

export default NoteCards;
