import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const RemoveItemMenu = ({onClose, open, selectedName}) => {
    if (!selectedName) return;
    console.log('SELECTED NAME ' + selectedName)
  return (
    <Dialog onClose={onClose} open={open} maxWidth = "md" 
    hideBackdrop = {true}
    PaperProps={{ sx: { width: "fit-content", height: "fit-content", borderRadius: '8px', paddingTop: '4px', backgroundColor: 'rgb(3, 3, 3)', position: 'fixed', top: '50%', left: '25%', transform: 'translate(-50%, -50%)' , boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', textAlign: 'center'} }}>
        <DialogTitle sx={{fontSize: '1rem', fontWeight: 600, backgroundColor: 'rgb(12, 12, 12)', color: 'rgba(255, 255, 255)', whiteSpace: 'nowrap', borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}>Remove {selectedName}</DialogTitle>
        <List sx={{ pt: 0, backgroundColor: 'rgb(3, 3, 3)', display: 'flex'}} >
        <ListItem disableGutters sx={{color: 'rgb(3, 3, 3)', backgroundColor: 'rgba(255, 255, 255)', padding: '0', borderBottomLeftRadius: '2rem'}} >
          <ListItemButton
            autoFocus
            onClick={() => onClose('remove')}
          >
            <ListItemText primary="remove" sx={{ textAlign: 'center', whiteSpace: 'nowrap'}}/>
          </ListItemButton>
        </ListItem>

        <ListItem sx={{color: 'rgba(255, 255, 255)', padding: '0', backgroundColor: 'rgba(255, 255, 255)', borderBottomRightRadius: '2rem'}}>
          <ListItemButton
            autoFocus
            onClick={() => onClose('cancel')}
            className='cancel'
          >
            <ListItemText primary="cancel" className='cancel'/>
          </ListItemButton>
        </ListItem>

        </List>
    </Dialog>
  )
}

export default RemoveItemMenu