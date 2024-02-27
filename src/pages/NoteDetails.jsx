import { useTranslation } from "react-i18next";
import Labels from "../components/Labels/Labels";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectNoteById } from "../app/reducers/notesSlice";
import { formatTimestamp } from "../utils/dateUtils";
import { LoadingFull } from "../components/Loading";
import NotFound from "../components/NotFound";
import {
    permanentlyDeleteNoteAction,
    restoreNoteAction,
} from "../app/actions/notesActions";

function NoteDetails() {
    const { id } = useParams();
    const note = useSelector((state) => selectNoteById(state, id));
    const status = useSelector((state) => state.notes.status);
    const { t } = useTranslation();
    const { btnLabel, label } = t("NoteDetails");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (status === "loading") return <LoadingFull />;
    if (!note) return <NotFound />;

    const { title, description, lastModified, deleted } = note;

    const handleBtnClick = async () => {
        if (deleted) {
            await restoreNoteAction(note, dispatch);
            return;
        }
        navigate(`/edit/${id}`);
    };

    const handlePermanentlyDelete = async () => {
        await permanentlyDeleteNoteAction(note, dispatch);
        navigate("/deleted");
    };

    return (
        <div className="h-screen max-h-screen min-h-screen flex-grow  flex-col overflow-y-auto bg-cardLight pb-[7rem] dark:bg-cardDark md:bg-bgLight md:py-4 md:pb-4 md:dark:bg-bgDark">
            <div className="mx-auto w-full space-y-4 rounded-lg bg-cardLight px-4 py-4 dark:bg-cardDark sm:w-5/6 md:bg-bgLight md:dark:bg-bgDark lg:w-[70%]">
                <h2 className="mb-2 border-b-2 border-textLight pb-2 text-2xl font-bold shadow-lg dark:border-textDark md:text-3xl">
                    {title}
                </h2>
                <p className="whitespace-pre-line text-base">{description}</p>
                <p className="text-sm">
                    {label.lastModified}
                    {formatTimestamp(lastModified)}
                </p>
                <Labels note={note} />
                <button className="button w-full" onClick={handleBtnClick}>
                    {deleted ? btnLabel.restore : btnLabel.edit}
                </button>
                {deleted && (
                    <button
                        className="button w-full bg-danger"
                        onClick={handlePermanentlyDelete}
                    >
                        {btnLabel.deletePerm}
                    </button>
                )}
            </div>
        </div>
    );
}

export default NoteDetails;
