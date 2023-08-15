import '../Login/Login.css';
import './NoteEditor.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Note from '../../classes/Note';
import { getCurrentDate } from '../../utils/dateUtils';
import { useContext } from 'react';
import { NotesContext } from '../../services/context';
import { showToast, dismissToast } from '../../utils/toast';
import User from '../../classes/User';
import { AuthContext } from '../../services/AuthContext';

function NoteEditor({ isNewPage = false }) {

    // State variables
    const { notes } = useContext(NotesContext);
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
    const { authState, setAuthState } = useContext(AuthContext);

    // Handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({
            ...note,
            [name]: value
        })
    }


    useEffect(() => {
        if (!authState.isAuthenticated) {
            (async () => {
                setAuthState(async (data) => { return { ...data, isAuthenticated: await User.checkUserAuth() } });
            })
        }

        const fetchNote = () => {
            setNote(note => {
                return {
                    ...note,
                    lastModified: getCurrentDate()
                }
            });
        }
        if (!isNew && authState.isAuthenticated) {
            fetchNote();
        } else {
            titleRef.current.focus();
        }
    }, [isNew, id]);

    const validateNote = () => {
        if (note.title === '' || note.description === '') {
            dismissToast();
            showToast('info', 'Title and description both are required!');
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
            const isSaved = await Note.addNote(note);
            if (isSaved) {
                setIsBtnClicked(false);
                navigate('/');
            }
        } else {
            const isUpdated = await Note.updateNote(id, note);
            if (isUpdated) {
                setIsBtnClicked(false);
                navigate('/');
            }
        }
    }

    return (
        <>
            <div className='Page'>
                <div className="form-container">
                    <p className="title">{isNew ? 'Create Note' : 'Update Note'}</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" placeholder="" onChange={handleChange} value={note.title} ref={titleRef} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" placeholder="" onChange={handleChange} rows={10} value={note.description}></textarea>
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