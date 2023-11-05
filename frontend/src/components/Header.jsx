import React from 'react'

const Header = ( {handleSignUp, user, setUser}) => {

  const handleLogOut = async () => {
    await fetch(`${import.meta.env.VITE_APP_URL}logOut`, {
      method: 'POST'});
    setUser(null);
  }

  
  return (
    <div className='header'>
        <h1>League of Random</h1>
        <h4 style={{color: '#F7F4EF'}}>a site that lets you troll your teammates</h4>
        {user ? 
         <div style = { {position: 'absolute', bottom: '10px', right: '2rem', display:'flex', gap: '0.8rem' }}>
         <span style={{ color:'#F7F4EF', cursor: 'pointer'}} className='sign-up' onClick={() => handleLogOut()}>Log Out</span>
     
       </div> 
        :
        <div style = { {position: 'absolute', bottom: '10px', right: '2rem', display:'flex', gap: '0.8rem' }}>
          <span style={{ color:'#F7F4EF', cursor: 'pointer'}} className='sign-up' onClick={() => handleSignUp('Log In')}>Log In</span>
        <span style={{ cursor: 'pointer', color:'#F7F4EF'}} className='sign-up' onClick={() => handleSignUp('Sign Up')}>Sign Up</span>
        </div>
      }
       
    </div>
    
  )
}

export default Header