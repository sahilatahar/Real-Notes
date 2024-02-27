import { useTranslation } from "react-i18next";
import NoteCards from "../components/NoteCards/NoteCards";

function DeletedNotes() {
    const { t } = useTranslation();
    const { title } = t("DeletedNotes");

    return (
        <div className="max-h-screen flex-grow overflow-y-scroll px-3 pb-14 md:px-8 md:pb-0">
            <h1 className="py-8 text-center text-3xl font-bold md:text-4xl">
                {title}
            </h1>
            <NoteCards />
        </div>
    );
}

export default DeletedNotes;
