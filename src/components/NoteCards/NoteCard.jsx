import PropTypes from "prop-types";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Labels from "../Labels/Labels";

const Card = ({ note }) => {
    const navigate = useNavigate();
    const { title, description, id } = note;

    // Handling click on card to show note details
    const handleClick = () => {
        navigate(`/notes/${id}`);
    };

    return (
        <div
            className="relative mx-auto flex w-[95%] max-w-[400px] cursor-pointer select-none flex-col justify-between rounded-xl bg-cardLight p-4 shadow-lg dark:border-white dark:bg-cardDark md:mx-0 md:p-6"
            onClick={handleClick}
        >
            <h2 className="mb-4 overflow-hidden truncate text-ellipsis border-b-2 border-black pb-2 text-2xl font-semibold dark:border-white md:text-3xl">
                {title}
            </h2>
            <p className="mb-4 line-clamp-6 max-w-full break-words text-lg leading-6 md:min-h-[100px]">
                {description}
            </p>
            <Labels note={note} />
        </div>
    );
};

Card.propTypes = {
    note: PropTypes.object.isRequired,
};

const NoteCard = ({ note }) => {
    return useMemo(() => <Card key={note} note={note} />, [note]);
};

export default NoteCard;
