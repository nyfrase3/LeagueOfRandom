import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const AddItemMenu = ({onClose, open, selectedId}) => {

    const handleItemClick = (value) => {
        console.log('items id! during menu to add item' + ' ' + selectedId)
        onClose(value, selectedId);
    }

  return (
    <Dialog onClose={onClose} open={open} maxWidth = "md" 
    hideBackdrop = {true}
    PaperProps={{ sx: { width: "210px", height: "220px", padding: '5px', borderRadius: '7%', backgroundColor: 'white', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' , boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', textAlign: 'center'} }}>
        <DialogTitle sx={{fontSize: '1.2rem', fontWeight: 600, backgroundColor: '' }}>Add Item</DialogTitle>
        <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleItemClick('add')}
          >
            <ListItemText primary="add item" className='add'/>
          </ListItemButton>
        </ListItem>

        <ListItem disableGutters >
          <ListItemButton
            autoFocus
            onClick={() => handleItemClick('cancel')}
            className='cancel'
          >
            <ListItemText primary="cancel" className='cancel'/>
          </ListItemButton>
        </ListItem>

        </List>
    </Dialog>
  )
}

export default AddItemMenu