import { useTranslation } from "react-i18next";
import Labels from "../components/Labels/Labels";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "../app/reducers/notesSlice";
import { formatTimestamp } from "../utils/dateUtils";
import noteEmptyObj from "../utils/noteEmptyObj";
import { LoadingFull } from "../components/Loading";

function NoteDetails() {
    const { id } = useParams();
    const note =
        useSelector((state) => selectNoteById(state, id)) || noteEmptyObj;
    const status = useSelector((state) => state.notes.status);
    const { t } = useTranslation();
    const { btnLabel, label } = t("NoteDetails");
    const navigate = useNavigate();
    const { title, description, lastModified } = note;

    const handleBtnClick = () => {
        navigate(`/edit/${id}`);
    };

    if (status === "loading") return <LoadingFull />;

    return (
        <div className="h-screen max-h-screen min-h-screen flex-grow  flex-col overflow-y-auto p-2 pb-[7rem] md:pb-4">
            <div className="mx-auto w-full space-y-4 rounded-lg bg-cardLight px-4 py-4 dark:bg-cardDark md:w-5/6 lg:w-[70%]">
                <h2 className="mb-2 border-b-2 border-textLight pb-2 text-2xl font-bold shadow-lg dark:border-textDark md:text-3xl">
                    {title}
                </h2>
                <p className="whitespace-pre-line text-base">{description}</p>
                <p className="text-sm">
                    {label.lastModified}
                    {formatTimestamp(lastModified)}
                </p>
                <Labels note={note} />
                <button className="submit-btn w-full" onClick={handleBtnClick}>
                    {btnLabel.edit}
                </button>
            </div>
        </div>
    );
}

export default NoteDetails;
