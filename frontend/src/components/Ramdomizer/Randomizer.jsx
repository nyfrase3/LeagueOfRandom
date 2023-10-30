import { useState, useEffect } from 'react'

import '../../App.css'
import Champion from './Champion';

import ChampionFilters from './ChampionFilters';
import ItemFilters from './ItemFilters';
import DefaultChampion from './DefaultChampion';
import ChampionNames from './ChampionNames';
import Build from '../Build'
import Stats from '../Stats';


function Randomizer() {

  const [champion, setChampion] = useState(null);
  const [type, setType] = useState('ALL');
  const [classState, setClassState] = useState('ALL');
  const [build, setBuild] = useState(null);
  const [selectedChampion, setSelectedChampion] = useState('ANY'); 

  const [boots, setBoots] = useState("ALL");
  const [mainStat, setMainStat] = useState("ALL");
  const [none, setNone ] = useState(false);
  const [all, setAll] = useState(true);
  
  const [subStats, setSubStats] = useState({
    health: true,
    percentattackspeed: true,
    mana: true,
    abilityhaste: true,
    armor: true,
    magicresist: true,
    attackdamage: true,
    abilitypower: true,
  })
  


  const getRandom = () => {
    fetch(`${import.meta.env.VITE_APP_URL}randomChampion/${selectedChampion}/${type}/${classState}`).then(res => res.json()).then(json => setChampion(json[0]));

   
    const body = {};
    Object.keys(subStats).map(stat => {
      if (subStats[stat]) {
        body[stat] = true;
      }
  
    });


    fetch(`${import.meta.env.VITE_APP_URL}randomItems/${boots}/${mainStat}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json()).then(json => setBuild(json))

  }

  return (
    <>
    <div className='page'>

    <div className='outer-cont'>
      <div>
    <ChampionFilters type={type} setType={setType} classState={classState} setClassState={setClassState} />
    < ChampionNames name={selectedChampion} setName={setSelectedChampion}/>
        </div>
   
      <div className='champ-cont'>

        {champion ? 
        <Champion champion={champion} />
        :
        <DefaultChampion />
        }
        {
          build 
          ?
          <Build items={build} />
          :
          null
        }

        <button onClick={getRandom}>Randomize</button>
        </div>
        <div className='middle-flex'>
        <Stats items={build}/>
      
        <div className='filters'>
   
        <ItemFilters boots={boots} setBoots={setBoots} mainStat={mainStat} setMainStat={setMainStat} none={none} setNone={setNone} all={all} setAll={setAll} subStats={subStats} setSubStats={setSubStats}/> 
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Randomizer
