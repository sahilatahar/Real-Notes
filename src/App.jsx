import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Edit from './pages/Edit/Edit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';


function App() {

  const [email, setEmail] = useState('');

  const setEmailID = (email) => {
    setEmail(email);
    localStorage.setItem('email', email);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home email={email} setEmail={setEmailID} />} />
          <Route exact path='/login' element={<Login setEmail={setEmailID} />} />
          <Route exact path='/new' element={<Edit email={email} isNewPage={true} />} />
          <Route exact path='/edit/:id' element={<Edit email={email} />} />
          <Route path='*' element={<Home email={email} setEmail={setEmailID} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;