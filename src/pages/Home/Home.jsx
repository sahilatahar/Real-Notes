import './Home.css';
import notesImg from '../../images/notes.png';
import { UilPlus, UilSignout } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Card from '../../components/Card/Card';
import PropTypes from 'prop-types';
import noNotesImg from '../../images/no_notes.svg';
import Note from '../../services/Note';
import { toast } from 'react-toastify';
import { sortNotes } from '../../utils/sortUitls';

function Home({ email, setEmail }) {

    // State variables and Hooks
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [starredNotes, setStarredNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    // Function to fetch notes from firebase
    const fetchNotes = async (emailID) => {
        setLoading(true);
        try {
            const todoRef = collection(db, emailID);
            let querySnapshot = await getDocs(todoRef);
            let allNotes = querySnapshot.docs.map(doc => doc.data());
            setNotes(allNotes);
            setStarredNotes(allNotes.filter(note => note.starred));
            setLoading(false);
        } catch (e) {
            toast.dismiss();
            toast.error('Unable to fetch your notes', {
                position: toast.POSITION.TOP_CENTER,
                delay: 200,
            });
        }
    }

    useEffect(() => {
        const emailID = localStorage.getItem('email') || "";

        // Checking condition if email is saved and logged in then fetch notes otherwise goto login page
        if (emailID.length > 0) {
            setEmail(emailID);
            fetchNotes(emailID);
        }
        else {
            navigate('/login');
        }
    }, [navigate, setEmail]);


    const handleTabs = (e) => {
        const className = e.target.className;
        if (className === activeTab) return;
        setActiveTab(className);
    }

    // Function to handle notes star and instar
    const handleNoteStar = async (id) => {
        let note = notes.find(note => note.id === id);
        let { starred } = note;
        toast.dismiss();
        toast.success(`Note ${starred ? 'remove from starred' : 'mark as starred'}`, {
            position: toast.POSITION.TOP_CENTER,
            delay: 200,
        });
        await Note.updateNote(email, id, { ...note, starred: !starred });
        setNotes(notes => [...notes.filter((note) => note.id !== id), { ...note, starred: !starred }]);
        if (!starred) {
            setStarredNotes(starredNotes => [...starredNotes.filter((note) => note.id !== id), { ...note, starred: !starred }]);
        } else {
            setStarredNotes(starredNotes => starredNotes.filter((note) => note.id !== id));
        }
    }

    const editNote = async (id) => {
        navigate(`/edit/${id}`);
    }

    const deleteNote = async (id) => {
        toast.dismiss();
        toast.success('Note deleted successfully', {
            position: toast.POSITION.TOP_CENTER,
            delay: 200,
        });
        setNotes(notes.filter(note => note.id !== id));
        setStarredNotes(starredNotes.filter(note => note.id !== id));
        await Note.deleteNote(email, id);
    }

    const signOut = () => {
        setEmail("");
        localStorage.removeItem('email');
        toast.dismiss();
        toast.success('Log out successfully', {
            position: toast.POSITION.TOP_CENTER,
            delay: 200,
        });
        navigate('/login');
    }

    // Notes card
    let notesCards = sortNotes(notes).map(note => <Card key={note.id} {...{ email, note, deleteNote, handleNoteStar, editNote }} />);

    // Starred notes card
    let starredCards = sortNotes(starredNotes).map(note => <Card key={note.id} {...{ email, note, deleteNote, handleNoteStar, editNote }} />);

    // No notes image preview
    let noNotes = (text = 'No notes found') => {
        return <div className="no-notes"><img src={noNotesImg} alt="" /><h1>{text}</h1></div>
    }

    return (
        <>
            <div className='Home'>
                <button className="sign-out-btn" onClick={signOut} title='Sign out'><UilSignout size='40' className='icon' /></button>
                <h1 className='title'>Your Notes <img src={notesImg} alt="" /></h1>
                <div className="tabs">
                    <div className="all" onClick={handleTabs} style={{ borderBottom: activeTab === 'all' ? '2px solid white' : 'none' }}>All ({notes.length})</div>
                    <div className="starred-tab" onClick={handleTabs} style={{ borderBottom: activeTab !== 'all' ? '2px solid white' : 'none' }}>Starred ({starredNotes.length})</div>
                </div>
                {!loading ? <div className="cards" >
                    {activeTab === 'all' ?
                        (notes.length > 0 ? notesCards : noNotes())
                        : (starredNotes.length > 0 ? starredCards : noNotes('You haven\'t starred any notes yet'))}
                </div> : <h1 className='loading'>Please wait...</h1>}
            </div>

            <button className="create-btn" onClick={() => navigate('/new')}>
                <UilPlus className="icon" size='40' />
            </button>
        </>
    )
}

Home.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired
}

export default Home;