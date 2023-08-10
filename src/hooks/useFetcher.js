import { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../services/context';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function useFetcher() {
    const { setNotes, setStarredNotes, setEmail } = useContext(NotesContext);
    const [loading, setLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isToastDisplayed, setIsToastDisplayed] = useState(false);
    const navigate = useNavigate();

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
            console.log(e)
            toast.dismiss();
            toast.error('Unable to fetch your notes', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    }

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);


    useEffect(() => {
        if (!isToastDisplayed) {
            if (!isOnline) {
                toast.dismiss();
                toast.error('You are offline. Please ensure you are connected to the internet.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    onClose: () => {
                        setIsToastDisplayed(false);
                    }
                });
            }
        }

        // Getting email from local storage
        const emailID = localStorage.getItem('email') || "";

        if (!isOnline) return;

        // Checking condition if email is saved and logged in then fetch notes otherwise goto login page
        if (emailID.length > 0) {
            setEmail(emailID);
            fetchNotes(emailID);
        }
        else {
            navigate('/login');
        }

    }, [isOnline]);

    return { loading }
}

export default useFetcher;