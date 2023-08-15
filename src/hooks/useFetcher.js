import { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../services/context';
import { showToast, dismissToast } from '../utils/toast';
import { AuthContext } from '../services/AuthContext';
import FirebaseNote from '../classes/FirebaseNote';

function useFetcher() {
    const { setNotes, setStarredNotes } = useContext(NotesContext);
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);

    // Function to fetch notes from firebase
    const fetchNotes = async () => {
        setLoading(true);
        try {
            let allNotes = await FirebaseNote.getNotes();
            setNotes(allNotes);
            setStarredNotes(allNotes.filter(note => note.starred));
            setLoading(false);
        } catch (e) {
            dismissToast();
            console.log(e);
            showToast('error', 'Unable to fetch your notes');
        }
    }

    useEffect(() => {
        if (authState.isAuthenticated) {
            fetchNotes();
        }
    }, [authState.isAuthenticated]);

    return { loading }
}

export default useFetcher;