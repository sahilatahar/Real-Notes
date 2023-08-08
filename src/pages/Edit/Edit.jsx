import '../Login/Login.css';
import './Edit.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UilAngleLeft } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';
import Note from '../../services/Note';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentDate } from '../../utils/dateUtils';

function Edit({ email, isNewPage = false }) {

    // State variables
    const navigate = useNavigate();
    const { id } = useParams(); // Note id
    const isNew = isNewPage;

    const [note, setNote] = useState({
        title: !isNew ? 'Please wait...' : '', description: '', starred: false
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

    // Handling Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isBtnClicked) return;
        setIsBtnClicked(true);
        if (isNew) {
            try {
                toast.dismiss();
                toast.success('Note added successfully', {
                    position: toast.POSITION.TOP_CENTER,
                    delay: 200,
                });
                let docRef = await Note.addNote(email, note);
                await Note.updateNote(email, docRef.id, { id: docRef.id, ...note });
                // console.log("Notes added success", docRef.id);
                setIsBtnClicked(false);
                navigate('/');
            } catch (error) {
                toast.dismiss();
                toast.error("Note adding error!", {
                    position: toast.POSITION.TOP_CENTER,
                    delay: 200,
                });
            }
        } else {
            try {
                toast.dismiss();
                toast.success('Note updated successfully', {
                    position: toast.POSITION.TOP_CENTER,
                    delay: 200,
                });
                await Note.updateNote(email, id, note);
                setIsBtnClicked(false);
                navigate('/');
            } catch (error) {
                toast.dismiss();
                toast.error("Note update error!", {
                    position: toast.POSITION.TOP_CENTER,
                    delay: 200,
                });
                console.log(error);
            }
        }
    }

    useEffect(() => {
        // Fetching Date from firestore
        const fetchNote = async () => {
            let note = await Note.getNote(email, id);
            setNote({
                title: note.title,
                description: note.description,
                starred: note.starred,
                lastModified: getCurrentDate()
            });
        }
        if (!isNew) {
            fetchNote();
        }
    }, []);

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
                            <input type="text" name="title" id="title" placeholder="" onChange={handleChange} value={note.title} />
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

Edit.propTypes = {
    email: PropTypes.string.isRequired,
    isNewPage: PropTypes.bool
}

export default Edit;