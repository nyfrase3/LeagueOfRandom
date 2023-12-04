import React, {useState, useRef, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Randomizer from './components/Ramdomizer/Randomizer'
import Nav from './components/Nav'
import ItemBuilder from './components/ItemBuilder/ItemBuilder'
import Header from './components/Header'
import './App.css'
import About from './components/About'
import SignUp from './components/User/SignUp'
import DeleteAccount from './components/User/DeleteAccount'
import UserBuilds from './components/User/UserBuilds'


const App = () => {

const [showModal, setShowModal] = useState(false)
const [user, setUser] = useState(null);
const modalType = useRef(null);
const [showDeleteAccount, setShowDeleteAccount] = useState(false);

const closeModal = () => {
  setShowModal(false);
}


const handleSignUp = (type) => {
  modalType.current = type;
  setShowModal(true);
}

const closeDeleteAccount = () => {
  setShowDeleteAccount(false);
}

const handleDeleteAccount = () => {
  setShowDeleteAccount(true);
}

useEffect( ()=> { 
  fetch(`${import.meta.env.VITE_APP_URL}isLoggedIn`, {
    method: 'GET',
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json()).then(json => {
    if (json.isLoggedIn){
      setUser(json.user);
    }
  })
}, [])

  return (
    <>
    <BrowserRouter>
    <div className='app-wrapper' style={{display: 'flex', flexDirection: 'column', position: 'relative', margin: '0', padding: '0'}}>
        <Header handleSignUp={handleSignUp} user={user} setUser={setUser} handleDeleteAccount={handleDeleteAccount}/>
        <Nav />  
        {
          showModal && 
          <SignUp closeModal={closeModal} setUser={setUser} type={modalType.current}/>
        }

        {
          showDeleteAccount && 
          <DeleteAccount  closeModal={closeDeleteAccount} user={user} setUser={setUser}/>
        }
       <Routes>
          <Route path='/' element={ <Randomizer user={user}/> } />
          <Route path='/build' element={ <ItemBuilder  user={user} /> } />
          <Route path='/build/:buildId' element={ <ItemBuilder  user={user} /> } />
          <Route path='/about' element={ <About / > } />
          <Route path='/builds/:username' element={ <UserBuilds user={user}/> }/>
          <Route path='*' element={ <Randomizer /> } />
          
       </ Routes>
       </div>
       </BrowserRouter>
       </>
  )
}

export default App