import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNoteAction, updateNoteAction } from "../app/redux/actions";
import { selectNoteById } from "../app/redux/notesSlice";
import { getCurrentDate } from "../utils/dateUtils";
import { dismissToast, showToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

function NoteEditor({ isNew = false }) {
    // State variables
    const { id } = useParams();
    const note = useSelector((state) => selectNoteById(state, id));
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const dispatch = useDispatch();
    const [noteState, setNoteState] = useState(
        isNew ? { title: "", description: "" } : note,
    );
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const { t } = useTranslation();
    const { title, label, btnLabel } = t("NoteEditor");

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

    // Handling Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateNote()) return;
        if (isBtnClicked) return;
        setIsBtnClicked(true);
        const noteData = {
            ...noteState,
            lastModified: getCurrentDate(),
            starred: false,
        };
        if (isNew.current) {
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
            setNoteState({ title: "", description: "" });
        }
    }, [isNew, note]);

    return (
        <>
            <div className="max-h-screen min-h-screen flex-grow items-center justify-center overflow-y-auto pb-12 sm:flex md:pb-0">
                <div className="rounded-xl p-4 text-textLight dark:text-textDark sm:w-2/3 sm:bg-cardLight sm:p-8 sm:dark:bg-cardDark md:h-auto md:w-[400px]">
                    <p className="py-8 text-center text-3xl font-bold leading-8 md:py-4">
                        {isNew.current ? title.create : title.update}
                    </p>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="input-group">
                            <label htmlFor="title">{label.title}</label>
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
                            <label htmlFor="description">
                                {label.description}
                            </label>
                            <textarea
                                name="description"
                                placeholder=""
                                onChange={handleChange}
                                rows={5}
                                value={noteState.description}
                                className="input-style"
                            ></textarea>
                        </div>
                        <button className="submit-btn w-full" type="submit">
                            {isNew.current ? btnLabel.create : btnLabel.update}
                        </button>
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
