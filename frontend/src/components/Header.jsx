import React from 'react'

const Header = (props) => {
  const {handleSignUp, loggedIn} = props;
  if (props.loggedIn) {

  }
  return (
    <div className='header'>
        <h1>League of Random</h1>
        <h4 style={{color: '#F7F4EF'}}>a site that lets you troll your teamates</h4>
        {props.loggedIn ? 
        <span>Hi</span>  
        :
        <span style={{position: 'absolute', bottom: '10px', right: '4rem', color:'#bf922a', cursor: 'pointer'}} className='sign-up' onClick={handleSignUp}>Sign Up</span>
      }
       
    </div>
    
  )
}

export default Header