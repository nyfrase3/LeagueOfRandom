import React from 'react'

const Item = ({item}) => {
    const itemUrl = `/items/${item.id}.png`;

  return (
    <div className='item'>
        <h6>{item.name}</h6>
        <img src={itemUrl} alt={item.name}/>
    </div>
  )
}

export default Item