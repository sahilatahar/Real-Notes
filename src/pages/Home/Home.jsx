import './Home.css';
import notesImg from '../../images/notes.png';
import { UilPlus, UilAngleUp } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import noNotesImg from '../../images/no_notes.svg';
import Note from '../../classes/Note';
import { sortNotes } from '../../utils/sortUitls';
import NoteCard from '../../components/Card/Card';
import { NotesContext } from '../../services/context';
import useFetcher from '../../hooks/useFetcher';
import User from '../../classes/User';
import { AuthContext } from '../../services/AuthContext';

function Home() {
    // State variables and Hooks
    const { notes, setNotes, starredNotes, setStarredNotes } = useContext(NotesContext);
    const navigate = useNavigate();
    const { loading } = useFetcher();
    const [activeTab, setActiveTab] = useState('all');
    const [moveToTopBtn, setMoveToTopBtn] = useState(false);
    const { authState, setAuthState } = useContext(AuthContext);


    const handlePageScroll = () => {
        if (window.scrollY > 800) {
            setMoveToTopBtn(true);
        } else {
            setMoveToTopBtn(false);
        }
    }

    useEffect(() => {
        if (!authState.isAuthenticated) {
            (async () => {
                setAuthState(async (data) => { return { ...data, isAuthenticated: await User.checkUserAuth() } });
            })()
        }
        window.addEventListener('scroll', handlePageScroll);

        () => {
            window.removeEventListener('scroll', handlePageScroll);
        }
    }, [authState.isAuthenticated]);

    const handleTabs = (e) => {
        const className = e.target.className;
        if (className === activeTab) return;
        setActiveTab(className);
    }

    // Function to handle notes star and instar
    const handleNoteStar = async (id) => {
        let note = notes.find(note => note.id === id);
        let starred = note.starred;
        await Note.handleNoteStar(id, note);
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
        setNotes(notes => notes.filter(note => note.id !== id));
        setStarredNotes(starredNotes => starredNotes.filter(note => note.id !== id));
        await Note.deleteNote(id);
    }

    // No notes image preview
    let noNotes = (text = 'No notes found') => {
        return <div className="no-notes"><img src={noNotesImg} alt="" /><h1>{text}</h1></div>
    }

    const handleCreateBtn = () => {
        if (moveToTopBtn) {
            moveToTop();
            return;
        }
        navigate('/new');
    }

    const moveToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className='Home'>
                <h1 className='title'>Your Notes <img src={notesImg} alt="" /></h1>
                <div className="tabs">
                    <div className="all" onClick={handleTabs} style={{ borderBottom: activeTab === 'all' ? '2px solid white' : 'none' }}>All ({notes.length})</div>
                    <div className="starred-tab" onClick={handleTabs} style={{ borderBottom: activeTab !== 'all' ? '2px solid white' : 'none' }}>Starred ({starredNotes.length})</div>
                </div>
                {!loading ? (<div className="cards" >
                    {activeTab === 'all' ?
                        (notes.length > 0 ? sortNotes(notes).map(note => <NoteCard key={note.id} {...{ note, deleteNote, handleNoteStar, editNote }} />) : noNotes())
                        : (starredNotes.length > 0 ? sortNotes(starredNotes).map(note => <NoteCard key={note.id} {...{ note, deleteNote, handleNoteStar, editNote }} />) : noNotes('You haven\'t starred any notes yet'))}
                </div>) : <h1 className='loading'>Please wait...</h1>}
            </div>

            <button className="create-btn" onClick={handleCreateBtn}>
                {moveToTopBtn ? <UilAngleUp className="icon" size='40' /> : <UilPlus className="icon" size='40' />}
            </button>
        </>
    )
}


export default Home;