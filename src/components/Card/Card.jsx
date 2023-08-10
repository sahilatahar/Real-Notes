import './Card.css';
import PropTypes from 'prop-types';
import { UilTrashAlt, UilStar, UilStarHalfAlt } from '@iconscout/react-unicons';
import { useMemo, useState } from 'react';

const Card = ({ note, deleteNote, handleNoteStar, editNote, }) => {

    const { title, description, id } = note;
    const [starred, setStarred] = useState(note.starred);

    // Handling click on card to edit note
    const handleClick = (e) => {
        const className = e.target.className;
        if (className === 'Card' || className === 'card__title' || className === 'card__description') {
            editNote(id);
        }
    }

    return (
        <div className='Card' onClick={handleClick}>
            <h2 className="card__title">{title || 'No Title'}</h2>
            <p className="card__description">{description}</p>
            <div className="buttons">
                <button id="btn-starred" onClick={() => { handleNoteStar(note.id); setStarred(e => !e) }} title='Star Note'>{starred ? <UilStarHalfAlt size='50' className='icon' /> : <UilStar size='50' className='icon' />}</button>
                <button id="btn-delete" onClick={() => deleteNote(note.id)} title='Delete Note'><UilTrashAlt size='50' className='icon' /></button>
            </div>
        </div>
    )
}

Card.propTypes = {
    note: PropTypes.object.isRequired,
    deleteNote: PropTypes.func.isRequired,
    handleNoteStar: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
}

const NoteCard = ({ note, deleteNote, handleNoteStar, editNote, }) => {
    return useMemo(() => <Card key={note} {...{ note, deleteNote, handleNoteStar, editNote, }} />, [note]);
};

export default NoteCard;