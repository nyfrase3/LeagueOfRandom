import React from 'react'
import Item from './Item'
import Tooltip from '@mui/material/Tooltip';

const Build = ({items = [{id: 0}, {id: -1}, {id: -2}, {id: -3}, {id: -4}, {id: -5}]}) => {

  return (
    <div className='build-cont'>
         <h3>Build</h3>
        <div className='build-flex'>
      
        {items?.map(item => 
       
            <Item item={item} key={item.id}/>
    
           
        )}
        </div>
    </div>
  )
}

export default Build