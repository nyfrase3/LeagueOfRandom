import React from 'react'
import Item from './Item'
import Tooltip from '@mui/material/Tooltip';
import RemoveItemMenu from './ItemBuilder/RemoveItemMenu';

const Build = ({items = [{id: 0}, {id: -1}, {id: -2}, {id: -3}, {id: -4}, {id: -5}], handleItemClick, showRemove, setShowRemove, itemToRemove, handleRemoveClose }) => {



  return (
    <div className='build-cont'>
        <div className='build-flex' >
      
        {items?.map(item => 
            <div style={{  backgroundColor: '#F7F4EF'}} key={item.id} onClick={()=> handleItemClick(item)}>
            <Item item={item} />
            </div>
           
        )}
        <RemoveItemMenu onClose={handleRemoveClose} open={showRemove} selectedName={itemToRemove?.name}/>
        </div>
    </div>
  )
}

export default Build