import React from 'react'

const Header = (props) => {
  return (
    <div className='header'>
        <h1>League of Random</h1>
        <h4>a site that lets you troll your teamates</h4>
        <div>
        {props.cildren}
        </div>
    </div>
    
  )
}

export default Header