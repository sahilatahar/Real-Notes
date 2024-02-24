import { Star, Trash } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
    deleteNoteAction,
    updateNoteStarAction,
} from "../../../app/redux/actions";

function CardButtons({ note }) {
    const dispatch = useDispatch();
    const { starred } = note;

    const handleNoteStar = async (e) => {
        e.stopPropagation();
        await updateNoteStarAction(note, dispatch);
    };

    const handleDeleteNote = async (e, id) => {
        e.stopPropagation();
        await deleteNoteAction(id, dispatch);
    };

    return (
        <div className="absolute bottom-4 left-4 pl-4">
            <button
                onClick={handleNoteStar}
                title="Star Note"
                className="mr-4 aspect-square cursor-pointer rounded-full text-star"
            >
                {starred ? (
                    <Star size="30" weight="fill" />
                ) : (
                    <Star size="30" />
                )}
            </button>
            <button
                onClick={(e) => handleDeleteNote(e, note.id)}
                title="Delete Note"
                className="mr-4 aspect-square cursor-pointer rounded-full text-danger"
            >
                <Trash size="30" weight="fill" />
            </button>
        </div>
    );
}

CardButtons.propTypes = {
    note: PropTypes.object.isRequired,
};

export default CardButtons;
