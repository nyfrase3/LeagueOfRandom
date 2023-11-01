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

  return (
    <div className='item' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{display: 'flex', flexDirection: 'column', justifyItems: 'space-between' }}>
     { item.id > 0 && 
     
      <h6>{item.name}</h6> }

        <div className='img-cont' style= {{height:   item.id > 0 ? '105px' : '127px', width: '127px'}}>
        {
        item.id > 0 ? 
        
          <img src={itemUrl} alt={item.name}/> :
          <div style={{height: '127px', display: 'flex', alignItems: 'center'}}>
          <p >empty slot</p>
          </div>
        }
      
           {item.id > 0 && 
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