import React from 'react'
import Item from './Item'

const Build = ({items}) => {
    console.log(items)
  return (
    <div className='build-cont'>
        <h3>Items</h3>
        <div className='build-flex'>
        {items.map(item => 
            <Item item={item} key={item.id}/>
        )}
        </div>
    </div>
  )
}

export default Build