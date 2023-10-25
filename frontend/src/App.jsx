import { useState, useEffect } from 'react'

import './App.css'
import Champion from './components/Champion';
import Header from './components/Header';
import ChampionFilters from './components/ChampionFilters';
import ItemFilters from './components/ItemFilters';
import DefaultChampion from './components/DefaultChampion';
import Build from './components/Build'
import Stats from './components/Stats';

function App() {
  const [champion, setChampion] = useState(null);
  const [type, setType] = useState('ALL');
  const [classState, setClassState] = useState('ALL');
  const [build, setBuild] = useState(null);

  const [boots, setBoots] = useState("ALL");
  const [mainStat, setMainStat] = useState("ALL");
  const [none, setNone ] = useState(false);
  const [all, setAll] = useState(true);
  
  const [subStats, setSubStats] = useState({
    health: true,
    percentattackspeed: true,
    mana: true,
    attackspeed: true,
    abilityhaste: true,
    armor: true,
    magicresist: true,
    attackdamage: true,
    abilitypower: true,
  })
  


  const getRandom = () => {
    fetch(`http://localhost:3000/randomChampion/${type}/${classState}`).then(res => res.json()).then(json => setChampion(json[0]));

   
    const body = {};
    Object.keys(subStats).map(stat => {
      if (subStats[stat]) {
        body[stat] = true;
      }
  
    });


    fetch(`http://localhost:3000/randomItems/${boots}/${mainStat}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    fetch('http://localhost:3000/randomItems').then(res => res.json()).then(json => setBuild(json))
  }

  return (
    <>
    <Header />
    <div className='page'>

    <div className='outer-cont'>
      <div className='champ-cont'>
      <button onClick={getRandom}>Randomize</button>
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
        </div>
        <Stats items={build}/>
        <div className='filters'>
        <ChampionFilters type={type} setType={setType} classState={classState} setClassState={setClassState} />
        <ItemFilters boots={boots} setBoots={setBoots} mainStat={mainStat} setMainStat={setMainStat} none={none} setNone={setNone} all={all} setAll={setAll} subStats={subStats} setSubStats={setSubStats}/> 
        </div>
      </div>
    </div>
    </>
  )
}

export default App
