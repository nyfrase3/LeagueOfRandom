import React from 'react'
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className='nav'>
    <NavLink to='/'className='home-icon'>Random</NavLink>
    <NavLink to='/build'>Item Builder</NavLink>
    <NavLink to='/about'>About</NavLink>
    </div>
  )
}

export default Nav