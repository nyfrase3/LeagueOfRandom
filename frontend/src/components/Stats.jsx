import React from 'react'

const statsMap = {
    "abilityhaste": "ability haste",
    "attackdamage": "attack damage",
    "abilitypower": "ability power",
    "armor": "armor",
    "cost": "cost",
    "health": "health",
    "lethality": "lethality",
    "magicpenetration": "magic penetration",
    "magicresist": "magic resist",
    "mana": "mana",
    "movespeed": "movement speed",
    "percentarmorpenetration": "armor penetration",
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

const Stats = ({items, wide = false}) => {
    const totalBuildStats = { };

    let showItems = true;
    
    if (!items || items.length <= 0 || items.every(i => i.id <= 0)){
        showItems = false;
    } else {
        items?.map( item => {
            Object.keys(item).map( key => {
                if (statsMap[key]){
                    let currStat = statsMap[key];
                    showItems = true;
                    if (!totalBuildStats[currStat]){
                        totalBuildStats[currStat] = item[key];
                    } else {
                        totalBuildStats[currStat] += item[key];
                    }
                }
    
            })
        });
        if (totalBuildStats.cost) {
            totalBuildStats.cost = totalBuildStats.cost.toLocaleString("en-US");
        }
      
    }
   

     






  return (
    <div className='stats-cont' style={{ width: wide ? '550px' : '230px' }}>
        <h5>Total Build's Stats</h5>
        <ul className='stats-flex'>
            {
            showItems ?
            Object?.keys(totalBuildStats)?.map(stat => 
                  {  
                    if (totalBuildStats[stat] !== 0) {
                        return ( 
                            <li key={stat} style={{ padding: "2px", lineHeight: '1.7rem'}}>
                            <span style={{fontSize: '1.3rem', letterSpacing: '-1px', marginRight:'0.2rem'}}>
                              {totalBuildStats[stat]}
                              {stat.includes("%") ? <span>%</span> : null}
                            </span>
                            <span > {stat.replace("%", "")}</span>
                          </li>
                            )}

                    }
            )
            :
            <p>Currently No Items Selected</p>
         
            }
        </ul>
    </div>
  )
}

export default Stats