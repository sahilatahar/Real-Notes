import PropTypes from "prop-types";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CardButtons from "./CardButtons";

const Card = ({ note }) => {
    const navigate = useNavigate();
    const { title, description, id } = note;

    // Handling click on card to edit note
    const handleClick = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div
            className="relative mx-auto min-h-[300px] w-[95%] max-w-[400px] cursor-pointer select-none rounded-xl bg-cardLight p-6 px-4 shadow-lg hover:shadow-lg dark:border-white dark:bg-cardDark md:mx-0"
            onClick={handleClick}
        >
            <h2 className="mb-4 overflow-hidden text-ellipsis border-b-2 border-black pb-2 text-2xl font-semibold dark:border-white md:text-3xl">
                {title}
            </h2>
            <p className="mb-4 line-clamp-6 max-w-full break-words text-lg leading-6">
                {description}
            </p>
            <CardButtons note={note} />
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
