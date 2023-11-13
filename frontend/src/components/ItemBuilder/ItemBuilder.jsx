import React, {useState, useEffect, useRef} from 'react'
import {Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper } from '@mui/material'
import {statsMap} from '../../stats'
import ItemsTable from './ItemsTable';
import ItemFilters from './ItemFilters'
import Build from '../Build';
import Stats from '../Stats';
import ChampionNames from '../Ramdomizer/ChampionNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import AddItemForm from './AddItemForm';

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const newEmptyBuild = [{id: 0}, {id: -1}, {id: -2}, {id: -3}, {id: -4}, {id: -5}];

function getBuildFromStorage  () {
  const oldBuild = localStorage.getItem('build');
  if (oldBuild) {
     return (JSON.parse(oldBuild));
  }
}

const ItemBuilder = ({user}) => {

  const [allItems, setAllItems] = useState([]);
  const [showOnly, setShowOnly] = useState('all');
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortBy, setSortBy] = useState({ field: 'name', order: 'desc'} );
  const [showZero, setShowZero] = useState(true);
  const [zeroError, setZeroError] = useState('')
  const [champion, setChampion] = useState('');
  const [buildMsg, setBuildMsg] = useState({
    error:'',
  });

  const oldBuild = localStorage.getItem('build');

  const [currentBuild, setCurrentBuild] = useState(oldBuild ? JSON.parse(oldBuild) : newEmptyBuild)

  const [error, setError] = useState('');
  const [showRemove, setShowRemove] = useState(false);

  const itemToRemove = useRef(null);

  const nullId = useRef(-6)


  const tableRef = useRef(null);

  const buildStatsRef = useRef(null);

  let isBuildFull = false;

  if (currentBuild.every(i => i.id > 0)) {
    isBuildFull = true;
  }
  function scrollToTop() {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  }

    useEffect( () => {
    
      fetch(`${import.meta.env.VITE_APP_URL}allItems`).then( res => 
      res.json()).then(json => {
        setAllItems(json)
        setFilteredItems(json)
      })
    }, []);


    useEffect(()=> {
      localStorage.setItem('build', JSON.stringify(currentBuild));

    }, [currentBuild]) 

   

    const handleShowOnlyChange = (e) => {
      const val = e.target.value;
      setShowOnly(val)
      setZeroError('')
      let copy = [...allItems]
      let filtered = filterByCategory(val, copy)
      if (!showZero && sortBy.field != 'name' && sortBy.field != 'random') {

        filtered = filtered.filter(item => 
          item[sortBy.field] > 0
        )
      }
      setFilteredItems(filtered)
  }

  const handleChecked = ( e, boolVal) => { //called when show zero values (T, F) is checked

    e.stopPropagation();
    const currentField = sortBy.field;
    if ((currentField == 'name' || currentField == 'random' || currentField == 'cost') ) {
      setZeroError('sort results by a criteria with non-zero values to use this option')
      return; 
    }//we only eliminate data if the field has a numerical value that can be a zero value
    setShowZero(boolVal);

  

    if (boolVal == false) {
      let copy = filteredItems.filter(item => item[currentField] > 0);
      setFilteredItems(copy);
    } else {
      let copy = filterByCategory(showOnly, allItems);
    
      sortByField(currentField, sortBy.order, copy);
      setFilteredItems(copy);
    }
    
    
}

  const handleSortChange = (e, val) => {
    e.stopPropagation();
    setZeroError('')
    let newOrder;
    if (val == sortBy.field) { // if we are already sorting by that field change it from asc to desc 
      newOrder = sortBy.order === 'asc' ? 'desc' : 'asc'; 
    } else {
      newOrder = 'desc'; // else default to desc  
    }
    const newSort = { field: val, 'order': newOrder };
    setSortBy( newSort );

    let copy = [...allItems];
    copy = filterByCategory(showOnly, copy);
    if (!showZero && val != 'name' && val != 'random' && val != 'cost') {
      copy = copy.filter(item => 
        item[val] > 0
      )
    } else {
      setShowZero(true);
    }
    
    sortByField(val, newOrder, copy);

    
    setFilteredItems(copy);
    scrollToTop();

};

const handleItemClick = (item) => {
  if (item.id <= 0) return;
  itemToRemove.current = item;
  setShowRemove(true);
}

const handleRemoveClose = (action) => {

  setShowRemove(false) 
  if (action == 'cancel') return;

  const copy = [...currentBuild];
  const indexToRemove = currentBuild.findIndex(i => i.id == itemToRemove.current.id);

  const newBuild = [...currentBuild.slice(0, indexToRemove), ...currentBuild.slice(indexToRemove + 1), {id: nullId.current}];

  nullId.current = nullId.current - 1;
  setCurrentBuild(newBuild);

  
}

const handleAddBuild = () => {
  if (!champion) {
    setBuildMsg({error: 'Select a champion for your build.'});
    return;
  }

  if (!user) {
    setBuildMsg({error: 'You must be logged in.'});
    return;
  }

  const buildIds = currentBuild.map(item => item.id)
  const newBody = {
    user: user.username,
    build: buildIds,
    stats: buildStatsRef.current,
    champion,
    random: 'false'
  };
  if (newBody.stats.cost && typeof newBody.stats.cost == 'string') {
    newBody.stats.cost = +(newBody.stats?.cost?.replace(',', ''))
  };
  console.log(user.username)
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
  console.log(json)
  if (json.error){
    setBuildMsg({error: json.error})
  } else {
    setBuildMsg(json);
  }

})

  };

  const clearBuild = () => {
    setCurrentBuild(newEmptyBuild);
    nullId.current = -6;
  };





  return (
    <div className='builder-container'>
      {/* <AddItemForm /> */}
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem'}} className='forMedia'>
        <div>
      <Build items={currentBuild} handleItemClick={handleItemClick} showRemove={showRemove} setShowRemove={setShowRemove} itemToRemove={itemToRemove.current} 
      handleRemoveClose={handleRemoveClose}/>

        <div style={{ position:'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '7px', padding: '10px 0 25px 0' }}>
     
        {
          buildMsg.error ? 
           <span style={{position: 'absolute', fontSize: '0.85rem', bottom: '0', color: '#FF4500', cursor: 'pointer'}} onClick={() => setBuildMsg({})}> <FontAwesomeIcon icon={faCircleXmark} style={{paddingRight: '5px'}}/>
          {buildMsg.error}</span> : <span style={{position: 'absolute', fontSize: '0.85rem', bottom: '0' }}>{buildMsg.success} </span>
          }
       
        <button onClick={clearBuild} style={{ }} disabled={currentBuild.every(i => i.id <= 0)}>Clear Build</button>
         <button onClick={handleAddBuild} style={{ }} disabled={!isBuildFull}>Add Build</button>
        </div>
      
      </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem'}}>
    {
      error && 
      
        <div className='err-div' style ={{ outline: '3px solid #FF4500', padding: '0px 1.5rem', cursor: 'pointer'}} onClick={()=> setError('')}>
        <p>{error}
        </p>
        </div>
       
    }
      <div>
      <Stats items={currentBuild} wide = {true} buildStatsRef={buildStatsRef} />
      </div>

    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems:'center' }}>
   
      <div >
        <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
        <ChampionNames name={champion} setName={setChampion} />
        <div>
        </div>
        </div>
    <ItemFilters showOnly={showOnly}  handleChange={handleShowOnlyChange} showZero={showZero} setShowZero={setShowZero} handleChecked={handleChecked} />
    <div style={{height: '25px'}}>
    {zeroError && 
    <span onClick={() => setZeroError('')} style= {{color: '#FF4500', cursor: 'pointer', fontSize: '0.85rem'}} className='error'><FontAwesomeIcon icon={faCircleXmark} style={{paddingRight: '5px'}}/>{zeroError}</span>
    }
    </div>
    </div>
    </div>
    </div>
    <ItemsTable items={filteredItems} showOnly={showOnly} sortBy={sortBy}  handleSortChange={handleSortChange} tableRef={tableRef} currentBuild={currentBuild} setCurrentBuild={setCurrentBuild} setError={setError}/> 
    
  </div>
  )
};


function filterByCategory (category, arr) {

  let copy = [...arr];
  if (category == 'all'){
    return copy;
  } else if (category == 'boots'){
    return copy.filter( item => item.hasOwnProperty('boots'));

  } else if (category == 'mythic') {
    return copy.filter( item => item.hasOwnProperty('mythic'));

  } else if (category == 'legendaries') {
    return copy.filter( item => 
      (!item.hasOwnProperty('boots') && !item.hasOwnProperty('mythic')))
 
  }
  return copy;
};

function sortByField(field, order, arr) { 
  if (field == 'name') {
    if (order == 'desc') {
      arr.sort( (a, b) => 
        (a.name < b.name ? -1 : 1)
    )
    } else {
     arr.sort( (a, b) => (a.name > b.name ? -1 : 1))
    }
 
  } else if (field == 'random') {
    shuffleArray(arr);
  } else

  if (order == 'desc') {
    arr.sort( (a,b) => {
      if (a[field] < b[field]){
        return 1;
      } else if (a[field] > b[field]){
        return -1;
      } else {
        if (a.name < b.name) return -1;
        else {
          return 1;
        }
      }
    })
  } else {
    arr.sort( (a,b) => {
      if (a[field] < b[field]){
        return -1;
      } else if (a[field] > b[field]){
        return 1;
      } else {
        if (a.name < b.name) return -1;
        else {
          return 1;
        }
      }
    })
  }
};



export default ItemBuilder