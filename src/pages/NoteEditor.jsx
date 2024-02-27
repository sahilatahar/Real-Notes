import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    addNoteAction,
    deleteNoteAction,
    updateNoteAction,
} from "../app/actions/notesActions";
import {
    selectDeletedNotes,
    selectNoteById,
    selectNotesAndStarredNotes,
} from "../app/reducers/notesSlice";
import { getCurrentDate } from "../utils/dateUtils";
import { dismissToast, showToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import LabelComponent from "../components/Labels/LabelComponent";
import { Star, Trash } from "@phosphor-icons/react";
import noteEmptyObj from "../utils/noteEmptyObj";
import { LoadingFull } from "../components/Loading";
import NotFound from "../components/NotFound";

function NoteEditor({ isNew = false }) {
    // State variables
    const { id } = useParams();
    const note = useSelector((state) => selectNoteById(state, id));
    const status = useSelector((state) => state.notes.status);
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const dispatch = useDispatch();
    const [noteState, setNoteState] = useState(noteEmptyObj);
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const { t } = useTranslation();
    const { title, label, btnLabel } = t("NoteEditor");
    const { deletedNotes } = useSelector(selectDeletedNotes);

    // Handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteState({
            ...noteState,
            [name]: value,
        });
    };

    const validateNote = () => {
        if (noteState.title === "" || noteState.description === "") {
            dismissToast();
            showToast("info", "Title and description both are required!");
            return false;
        }
        return true;
    };

    const handleDeleteNote = async (e, note) => {
        e.stopPropagation();
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (!isConfirmed) return;
        await deleteNoteAction({ note, dispatch, deletedNotes });
        navigate("/");
    };

    const handleNoteStar = async (e) => {
        e.stopPropagation();
        const isStarred = !noteState.starred;
        setNoteState({ ...noteState, starred: isStarred });
    };

    // Handling Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateNote()) return;
        setIsBtnClicked(true);
        const noteData = {
            ...noteState,
            lastModified: getCurrentDate(),
        };
        if (isNew) {
            const isSaved = await addNoteAction(noteData, dispatch);
            if (isSaved) {
                setIsBtnClicked(false);
                navigate("/");
            }
        } else {
            const isUpdated = await updateNoteAction(noteData, dispatch);
            if (isUpdated) {
                setIsBtnClicked(false);
                navigate("/");
            }
        }
    };

    useEffect(() => {
        if (isNew) {
            setNoteState(noteEmptyObj);
        } else if (note !== undefined) {
            setNoteState(note);
        }
    }, [isNew, note]);

    if (status === "loading") return <LoadingFull />;

    if (!note && !isNew) return <NotFound />;

    return (
        <>
            <div className="h-screen max-h-screen min-h-screen flex-grow  flex-col overflow-y-scroll bg-cardLight pb-[7rem] dark:bg-cardDark md:bg-bgLight md:py-4 md:dark:bg-bgDark">
                <div className="mx-auto w-full space-y-4 rounded-lg px-4 md:w-5/6 md:py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="relative flex-grow py-8 text-3xl font-bold leading-8 md:py-4">
                            {isNew ? title.create : title.edit}
                        </h2>
                        <button
                            onClick={handleNoteStar}
                            title="Star Note"
                            className="mr-4 aspect-square cursor-pointer rounded-full text-star"
                        >
                            {noteState.starred ? (
                                <Star size="30" weight="fill" />
                            ) : (
                                <Star size="30" />
                            )}
                        </button>
                        {!isNew && (
                            <button
                                onClick={(e) => handleDeleteNote(e, note)}
                                title="Delete Note"
                                className="aspect-square cursor-pointer rounded-full text-danger"
                            >
                                <Trash size="30" weight="fill" />
                            </button>
                        )}
                    </div>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="input-group">
                            <label htmlFor="title" className="font-bold">
                                {label.title}
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder=""
                                onChange={handleChange}
                                value={noteState.title}
                                ref={titleRef}
                                className="input-style"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="description" className="font-bold">
                                {label.description}
                            </label>
                            <textarea
                                name="description"
                                placeholder=""
                                onChange={handleChange}
                                rows={8}
                                value={noteState.description}
                                className="input-style resize-y"
                            ></textarea>
                        </div>
                        <LabelComponent {...{ noteState, setNoteState }} />
                        <div className="flex gap-2 md:gap-6">
                            {!isNew && (
                                <button
                                    className="button flex-grow border border-textLight bg-transparent text-textLight dark:border-textDark dark:text-textDark"
                                    onClick={() => navigate(`/notes/${id}`)}
                                >
                                    {btnLabel.cancel}
                                </button>
                            )}
                            <button
                                className="button flex-grow border border-primary"
                                type="submit"
                                disabled={isBtnClicked}
                            >
                                {isNew ? btnLabel.create : btnLabel.update}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

NoteEditor.propTypes = {
    isNew: PropTypes.bool,
};

export default NoteEditor;
