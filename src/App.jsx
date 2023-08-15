import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { NotesContext } from './services/context';
import Navbar from './components/Navbar/Navbar';
import AuthProvider from './services/AuthContext';
import ProtectedRoute from './services/ProtectedRoute';


function App() {

  const [notes, setNotes] = useState([]);
  const [starredNotes, setStarredNotes] = useState([]);
  const [isLoginPage, setIsLoginPage] = useState(false);

  return (
    <AuthProvider>
      <NotesContext.Provider value={{ notes, setNotes, starredNotes, setStarredNotes }}>
        <Router>
          {!isLoginPage && <Navbar />}
          <Routes>
            <Route path="*" element={<ProtectedRoute {...{ setIsLoginPage }} />} />
          </Routes>
        </Router>
        <ToastContainer transition={Zoom} />
      </NotesContext.Provider>
    </AuthProvider>
  )
}

export default App;