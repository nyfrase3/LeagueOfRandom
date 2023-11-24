import { useState, useEffect, useRef } from 'react'

import '../../App.css'
import Champion from './Champion';

import ChampionFilters from './ChampionFilters';
import ItemFilters from './ItemFilters';
import DefaultChampion from './DefaultChampion';
import ChampionNames from './ChampionNames';
import Build from '../Build'
import Stats from '../Stats';


function Randomizer({user}) {


  const [champion, setChampion] = useState(null);
  const [type, setType] = useState('ALL');
  const [classState, setClassState] = useState('ALL');
  const [build, setBuild] = useState(null);
  const [selectedChampion, setSelectedChampion] = useState('ANY'); 

  const [boots, setBoots] = useState("ALL");
  const [mainStat, setMainStat] = useState("ALL");
  const [none, setNone ] = useState(false);
  const [all, setAll] = useState(true);
  const [saveMsg, setSaveMsg] = useState('');
  console.log(saveMsg)
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

  const buildStatsRef = useRef(null);
  


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

  const saveBuild = () => {
    const buildIds = build.map(item => item.id);
    const newBody = {
      user: user.username,
      build: buildIds,
      stats: buildStatsRef.current,
      champion: champion.name,
      random: 'true'
    };
    console.log(newBody)

    fetch(`${import.meta.env.VITE_APP_URL}saveBuild`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }, body: JSON.stringify(newBody),
      credentials: 'include'
  }).then(res => {
    if (res.ok){
      return res.json();
    }
  }).then(json => {
  
    if (json.error){
      setSaveMsg(json)
    } else {
      setSaveMsg(json);
    }
  
  })
  }

  useEffect(()=> {
    console.log(buildStatsRef.current)
    Object.values( (k, v) => console.log(`${k}: ${v}`) );
  }, [buildStatsRef.current])

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
        <div style={{ display: 'flex', gap: '3px', position: 'relative', cursor: 'pointer'}} onClick={() => setSaveMsg('')}>
        <button className='random-btn' onClick={getRandom}>Randomize</button>
        {
          user && champion &&  
          <button className='random-btn' onClick={saveBuild}>Save Build</button>
        }
        
          <div style={{ position: 'absolute', bottom: '-23px', left: '20px'}}>
        {
          saveMsg &&  saveMsg.success ? <div>{saveMsg.success}</div> : <div>{saveMsg.error}</div>
          }
          </div>
        
        </div>
        </div>
        <div className='last-flex'>
        <Stats items={build} buildStatsRef={buildStatsRef}/>
      
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
