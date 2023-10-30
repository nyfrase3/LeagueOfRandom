import React, {useState, useEffect} from 'react'


const Champion = ({champion}) => {
    const nameEdited = (champion.name).replaceAll(/['\s]/g, '');
    const imgUrl = `/champions/${nameEdited}.jpg`;
    

  return (
        <section className='champion-info' >
        <h3>{champion.name}</h3>
        <p>{champion.title}</p>
      
        <div>
            <img src={imgUrl}/>
        </div>
        </section>
  )
}

export default Champion