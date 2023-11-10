import React from 'react'
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className='nav'>
    <NavLink to='/'className='home-icon' style={( {isActive}) => {
      return {
        color: isActive ? '#bf922a' : ''
      }

    }}>Random</NavLink>
    <NavLink to='/build' style={( {isActive}) => {
      return {
        color: isActive ? '#bf922a' : ''
      }

    }}>Item Builder</NavLink>
    <NavLink to='/about' style={( {isActive}) => {
      return {
        color: isActive ? '#bf922a' : ''
      }

    }}>About</NavLink>
    </div>
  )
}

export default Nav