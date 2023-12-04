import React, { useState } from 'react'

const statsMap = {
  "abilityhaste": "ability haste",
  "attackdamage": "attack damage",
  "abilitypower": "ability power",
  "armor": "armor",
  "health": "health",
  "lethality": "lethality",
  "magicpenetration": "magic penetration",
  "magicresist": "magic resist",
  "mana": "mana",
  "movespeed": "movement speed",
  "percentarmorpenetration": "armor penetration %",
  "percentattackspeed": "attack speed %",
  "percentbasehealthregen": "health regen %",
  "percentbasemanaregen": "mana regen %",
  "percentcriticalstrikechance": "crit chance %",
  "percentcriticalstrikedamage": "crit damage %",
  "percenthealandshieldpower": "heal & shield power %",
  "percentlifesteal": "lifesteal %",
  "percentmagicpenetration": "magic penetration %",
  "percentmovespeed": "movement speed %",
  "percentomnivamp": "omnivamp %",
  "percenttenacity": "tenacity %"
}

const Item = ({item}) => {

  let itemUrl = '';
  if (item.id > 0) itemUrl = `/items/${item.id}.png`;

    const [showToolTip, setShowToolTip] = useState(false);

    function handleMouseOver() {
      setShowToolTip( true )
    }
    
    function handleMouseOut() {
      setShowToolTip(false )
    }

    const tooltipStyle = {
      display: showToolTip ? 'block' : 'none',
      width: 'fit-content'
    }
    const isEmpty = item.id <= 0;

  return (
    <div className= { isEmpty ? 'empty-item item' : 'full-item item'}  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{display: 'flex', flexDirection: 'column', justifyItems: 'space-between' }}>
     { !isEmpty && 
     
      <h6 style={{textOverflow: 'ellipsis', overflow: 'hidden', width: '127px', marginTop: '7px', fontSize: '0.8rem', whiteSpace: 'nowrap'}}>{item.name}</h6> }

        <div className='img-cont' style= {{height:   !isEmpty ? '105px' : '127px', width: '127px'}}>
        {
        !isEmpty ? 
          <div >
          <img src={itemUrl} alt={item.name}/> 
          </div>
          :
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'default'}} className='empty-item'>
          <p >empty slot</p>
          </div>
        }
      
           {!isEmpty && 
            <div style={tooltipStyle} className='tooltip'>
                 <div className='tool-name'>{item.name}</div>
                 {
                   Object.keys(statsMap).map(key => {
                     if (item[key] > 0) {
                       return (
                         <div key={key} style={{whiteSpace: 'nowrap'}} ><span>{statsMap[key].replace('%', '')}: {item[key]}</span>
                           {
                             statsMap[key].includes('%') ? <span>%</span> : null 
                                   } 
                         </div>
                       )
                     }
                   })
                 }
                 <div className='tool-cost'><span>cost: {item.cost}</span></div>
               </div>
           }
      </div>
    </div>
  )
}

export default Item