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

const Stats = ({items}) => {
    const totalBuildStats = { };

    if (items) {

        items?.map( item => {
            Object.keys(item).map( key => {
                if (statsMap[key]){
                    let currStat = statsMap[key];
                    if (!totalBuildStats[currStat]){
                        totalBuildStats[currStat] = item[key];
                    } else {
                        totalBuildStats[currStat] += item[key];
                    }
                }
    
            })
        });
    
        totalBuildStats.cost = totalBuildStats.cost.toLocaleString("en-US");
    }




  return (
    <div className='stats-cont'>
        <h5>Total Build's Stats</h5>
        <div className='stats-flex'>
            {
            items?.length > 0 ?
            Object?.keys(totalBuildStats)?.map(stat => 
                  {  
                    if (totalBuildStats[stat] !== 0) {
                        return ( 
                            <div key={stat}>
                            <span>{stat.replace('%', '')}</span>: <span>{totalBuildStats[stat] }
                            {
                            stat.includes('%') ? <span>%</span> : null 
                            } 
                             {
                            stat.includes('cost') ? <span> g</span> : null 
                            }
                            </span>
                            </div>
                            )}

                    }
            )
            :
            <p>Currently No Items Selected</p>
         
            }
        </div>
    </div>
  )
}

export default Stats