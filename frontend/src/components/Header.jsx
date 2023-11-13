import React, {useState, useRef, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import UserMenu from './User/UserMenu';

const Header = ( {handleSignUp, user, setUser, handleDeleteAccount}) => {

  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenu = useRef(null)

  const handleLogOut = async () => {
    await fetch(`${import.meta.env.VITE_APP_URL}logOut`, {
      method: 'POST'});
    setUser(null);
  }


  const closeUserMenu = (e) => {
  
    if (userMenu.current && e.target !== userMenu.current && !userMenu.current.contains(e.target)) 
    {
      console.log(userMenu.current)
      console.log('closing the menu')
      setShowUserMenu(false);
    }
  };

  document.addEventListener('mousedown', closeUserMenu);

  
  return (
    <div className='header'>
        <h1>League of Random</h1>
        <h4 style={{color: '#F7F4EF'}}>a site that lets you troll your teammates</h4>
        {user ? 
         <div style = { {position: 'absolute', bottom: '1.5rem', right: '2rem', display:'flex', gap: '0.8rem', alignItems:'center' }} onClick={() => setShowUserMenu(!showUserMenu)}>
          <Avatar sx={{ bgcolor: '#BFBFBD', height: '37px', width: '37px', cursor: 'pointer', color: '#141823', alignItems: 'center', outline: '2px solid white' }}>{user.username[0]}</Avatar>
          {showUserMenu &&   
          <UserMenu user={user} handleLogOut={handleLogOut} menuRef={userMenu} handleDeleteAccount={handleDeleteAccount}/> }
        
       </div> 
        :
        <div style = { {position: 'absolute', bottom: '10px', right: '2rem', display:'flex', gap: '2vw' }}>
          <span style={{ color:'#F7F4EF', cursor: 'pointer'}} className='sign-up' onClick={() => handleSignUp('Log In')}>Log In</span>
        <span style={{ cursor: 'pointer', color:'#F7F4EF'}} className='sign-up' onClick={() => handleSignUp('Sign Up')}>Sign Up</span>
        </div>
      }
       
    </div>
    
  )
}

export default Header