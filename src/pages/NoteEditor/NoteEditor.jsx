import '../Login/Login.css';
import './NoteEditor.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { UilAngleLeft } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';
import Note from '../../services/Note';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentDate } from '../../utils/dateUtils';
import { useContext } from 'react';
import { NotesContext } from '../../services/context';
import { toast } from 'react-toastify';

function NoteEditor({ isNewPage = false }) {

    // State variables
    const { email, notes } = useContext(NotesContext);
    const navigate = useNavigate();
    const { id } = useParams(); // Note id
    const isNew = isNewPage;
    const titleRef = useRef(null);

    const [note, setNote] = useState(
        !isNew ? notes.find(note => note.id === id) : {
            title: '', description: '', starred: false
            , lastModified: getCurrentDate()
        });

    const [isBtnClicked, setIsBtnClicked] = useState(false);

    // Handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({
            ...note,
            [name]: value
        })
    }


    useEffect(() => {
        const fetchNote = () => {
            setNote(note => {
                return {
                    ...note,
                    lastModified: getCurrentDate()
                }
            });
        }
        if (!isNew) {
            fetchNote();
        } else {
            titleRef.current.focus();
        }
    }, [isNew, email, id]);

    const validateNote = () => {
        if (note.title === '' || note.description === '') {
            toast.dismiss();
            toast.info('Title and description both are required!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            return false;
        }
        return true;
    }

    // Handling Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateNote()) return;
        if (isBtnClicked) return;
        setIsBtnClicked(true);
        if (isNew) {
            if (await Note.addNote(email, note)) {
                setIsBtnClicked(false);
                navigate('/');
            }
        } else {
            if (await Note.updateNote(email, id, note)) {
                setIsBtnClicked(false);
                navigate('/');
            }
        }
    }

    return (
        <>
            <div className='Page'>
                <button className="back-btn" onClick={() => navigate('/')}>
                    <UilAngleLeft className="icon" size='50' />
                </button>

                <div className="form-container">
                    <p className="title">{isNew ? 'Create Note' : 'Update Note'}</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" placeholder="" onChange={handleChange} value={note.title} ref={titleRef} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" placeholder="" onChange={handleChange} rows={8} value={note.description}></textarea>
                        </div>
                        <button className="sign" type='submit'>{isNew ? 'Create' : 'Update'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

NoteEditor.propTypes = {
    isNewPage: PropTypes.bool
}

export default NoteEditor;