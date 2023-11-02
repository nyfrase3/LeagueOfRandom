import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Randomizer from './components/Ramdomizer/Randomizer'
import Nav from './components/Nav'
import ItemBuilder from './components/ItemBuilder/ItemBuilder'
import Header from './components/Header'
import './App.css'

import React, {useState} from 'react'
import About from './components/About'
import SignUp from './components/User/SignUp'

const App = () => {
// console.log(import.meta.env.VITE_APP_URL);
const [showSignUp, setShowSignUp] = useState(false)

const closeModal = () => {
  setShowSignUp(false);
}

const handleSignUp = () => {
  setShowSignUp(true)
}

  return (
    <>
    <BrowserRouter>
    <div className='app-wrapper' style={{display: 'flex', flexDirection: 'column', position: 'relative', margin: '0', padding: '0'}}>
        <Header handleSignUp={handleSignUp}/>
        <Nav />  
        {
          showSignUp && 
          <SignUp setShowModal={closeModal}/>
        }
       <Routes>
          <Route path='/' element={ <Randomizer /> } />
          <Route path='/build' element={ <ItemBuilder / > } />
          <Route path='/about' element={ <About / > } />
          <Route path='*' element={ <Randomizer /> } />
          
       </ Routes>
       </div>
       </BrowserRouter>
       </>
  )
}

export default App