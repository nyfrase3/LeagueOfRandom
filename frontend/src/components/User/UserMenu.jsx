import React from 'react'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserMenu = ({user, handleLogOut, menuRef, handleDeleteAccount}) => {

  return (
   
    <Box ref = {menuRef} sx={{ display: 'flex', backgroundColor: '#cccccc', position: 'absolute', top: '20px', right: '10px', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px' 
    }} onClick={ e => e.stopPropagation()}>
        <List  subheader={
            <ListSubheader
                style={{display: 'flex', justifyContent: 'space-around', backgroundColor: '#141823', padding: '0.7rem 1rem 3rem 1rem', height: '60px', width: '160px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
              inset
              className='sub-header'
            >
                <Avatar sx={{ bgcolor: '#BFBFBD', height: '37px', width: '37px', cursor: 'pointer', color: '#141823', alignItems: 'center', outline: '2px solid white' }}>{user.username[0]}</Avatar>
                <span style={{  letterSpacing: '1.75px', fontSize: '1.1rem', color: '#F7F4EF'}}>
              {user.username}
              </span>
            </ListSubheader>
          }>
            <ListItem style={{fontSize: '0.6rem', padding: '0'}}>
                <ListItemButton style={{padding: '0'}}>
                <ListItemText  primary={'view your builds'} style={{fontSize: '0.6rem', color: 'blue', cursor: 'pointer' , whiteSpace: 'nowrap', padding: '5px 0 5px 1.3rem'}} />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{fontSize: '0.6rem', padding: '0'}}>
                <ListItemButton style={{padding: '0'}} onClick={handleDeleteAccount}>
                <FontAwesomeIcon icon={faTrash} style={{fontSize: '1rem', paddingLeft: '0.75rem'}}/>
                <ListItemText  primary={'delete account'} inset={true} style={{fontSize: '0.6rem', color: 'rgb(203, 20, 20)', cursor: 'pointer' , whiteSpace: 'nowrap', padding: '5px 0 5px 0.75rem' }} />
                </ListItemButton>
            </ListItem>

            <ListItem style={{fontSize: '0.6rem', padding: '0'}}>
                <ListItemButton style={{padding: '0'}} onClick={handleLogOut}>
                <FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '1rem', paddingLeft: '0.75rem'}}/>
                <b>
                <ListItemText  primary={'log out'} inset={true} style={{fontSize: '0.6rem', cursor: 'pointer' , whiteSpace: 'nowrap', padding: '5px 0 5px 1.75rem'}} />
                </b>
                </ListItemButton>
            </ListItem>
          
         </List>
        
    </Box>
    
  )
}

export default UserMenu