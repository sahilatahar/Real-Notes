import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NoteEditor from './pages/NoteEditor/NoteEditor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { NotesContext } from './services/context';


function App() {

  const [email, setEmailID] = useState('');

  const setEmail = (email) => {
    setEmailID(email);
    localStorage.setItem('email', email);
  }

  const [notes, setNotes] = useState([]);
  const [starredNotes, setStarredNotes] = useState([]);


  return (
    <NotesContext.Provider value={{ notes, setNotes, starredNotes, setStarredNotes, email, setEmail }}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/new' element={<NoteEditor isNewPage={true} />} />
          <Route exact path='/edit/:id' element={<NoteEditor />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer transition={Zoom}/>
    </NotesContext.Provider>
  )
}

export default App;