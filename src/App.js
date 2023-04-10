import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Alert from './components/Alert';
import Nav from './components/Nav';

import Create from './views/Create';
import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import Single from './views/Single';
import Edit from './views/Edit'


function App() {

  let name = 'test'

  const now = new Date()

  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now) || false)
  const [message, setMessage] = useState(null)
  const [category, setCategory] = useState(null)

  function flashMessage(message, category) {
    setMessage(message)
    setCategory(category)

  }

  function logUserOut(){
    setLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExp')
    flashMessage('You have logged out', 'primary')
  }



  return (
    <div className="App">
    <Nav username={name} loggedIn={loggedIn} logUserOut={logUserOut} />
    {message ? <Alert message={message} category={category} flashMessage={flashMessage} /> : null}
    
    <div className='container'>
        <Routes>
            <Route path='/' element={<Home  loggedIn={loggedIn}/>} />                       
            <Route path='/signup' element={<Signup flashMessage={flashMessage} />} />
            <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={setLoggedIn} />} />
            <Route path='/create' element={<Create flashMessage={flashMessage} loggedIn={loggedIn} />} />
            <Route path='/posts/' element={<Signup flashMessage={flashMessage} loggedIn={loggedIn} />} />
            <Route path='/posts/:postID' element={<Single  loggedIn={loggedIn} />} />
            <Route path='/edit/:postID' element={<Edit flashMessage={flashMessage} loggedIn={loggedIn} />} />
            {/* <Route path='/delete/:postID' element={<Delete flashMessage={flashMessage} loggedIn={loggedIn} />} /> */}
           
        </Routes>
        
    </div>
</div>
  );
}

export default App;
