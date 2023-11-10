import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const AddItemMenu = ({onClose, open, selectedId, items, selectedItem}) => {

  let selectedName = '';
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == selectedId){
      selectedName = items[i].name;
      selectedItem.current = items[i];
      break;
    }
  }


    const handleItemClick = (value) => {
        // console.log('items id! during menu to add item' + ' ' + selectedId)
        onClose(value, selectedId);
    }

  return (
    <Dialog onClose={onClose} open={open} maxWidth = "md" 
    hideBackdrop = {true}
    PaperProps={{ sx: { width: "fit-content", height: "fit-content", borderRadius: '22px', backgroundColor: 'none', position: 'fixed', top: '60%', left: '25%', transform: 'translate(-50%, -50%)' , boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', textAlign: 'center'} }}>
        <DialogTitle sx={{fontSize: '1rem', fontWeight: 600, backgroundColor: '#141823', color: '#F7F4EF', whiteSpace: 'nowrap', borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}>Add {selectedName}</DialogTitle>
        <List sx={{ pt: 0, backgroundColor: '#F9F6F0', display: 'flex', padding: '0'}} >
        <ListItem disableGutters sx={{color: 'rgb(3, 3, 3)', backgroundColor: '#F9F6F0', paddingBottom: '0', borderBottomLeftRadius: '2rem'}} >
          <ListItemButton
            autoFocus
            onClick={() => handleItemClick('add')}
          >
            <ListItemText primary="add item" className='add' sx={{ textAlign: 'center', whiteSpace: 'nowrap'}}/>
          </ListItemButton>
        </ListItem>

        <ListItem sx={{color: 'rgba(255, 255, 255)', padding: '0', backgroundColor: '#F9F6F0', borderBottomRightRadius: '2rem'}}>
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