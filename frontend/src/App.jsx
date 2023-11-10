import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Randomizer from './components/Ramdomizer/Randomizer'
import Nav from './components/Nav'
import ItemBuilder from './components/ItemBuilder/ItemBuilder'
import Header from './components/Header'
import './App.css'

import React, {useState, useRef, useEffect} from 'react'
import About from './components/About'
import SignUp from './components/User/SignUp'

// async function getLoggedInUser () {
//   fetch(`${import.meta.env.VITE_APP_URL}isLoggedIn`, {
//     method: 'GET',
//     credentials: 'include', 
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   }).then(res => res.json()).then(json => {

//     if (json.isLoggedIn){
//       console.log(json.user)
//       return json.user;
//     } else {
//       return null;
//     }
//   })
// }

const App = () => {
// console.log(import.meta.env.VITE_APP_URL);
const [showModal, setShowModal] = useState(false)
const [user, setUser] = useState(null);
const modalType = useRef(null);
console.log(user)

const closeModal = () => {
  setShowModal(false);
}

const handleSignUp = (type) => {
  modalType.current = type;
  setShowModal(true);
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
        <Header handleSignUp={handleSignUp} user={user} setUser={setUser}/>
        <Nav />  
        {
          showModal && 
          <SignUp closeModal={closeModal} setUser={setUser} type={modalType.current}/>
        }
       <Routes>
          <Route path='/' element={ <Randomizer /> } />
          <Route path='/build' element={ <ItemBuilder  user={user} /> } />
          <Route path='/about' element={ <About / > } />
          <Route path='*' element={ <Randomizer /> } />
          
       </ Routes>
       </div>
       </BrowserRouter>
       </>
  )
}

export default App