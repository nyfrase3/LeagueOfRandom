import React, {useState, useEffect, useRef} from 'react'
import {Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper } from '@mui/material'
import {statsMap} from '../../stats'
import ItemsTable from './ItemsTable';
import ItemFilters from './ItemFilters'
import Build from '../Build';
import Stats from '../Stats';
import AddItemForm from './AddItemForm';

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}


const ItemBuilder = () => {
    
  const [allItems, setAllItems] = useState([]);
  const [showOnly, setShowOnly] = useState('all');
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortBy, setSortBy] = useState({ field: 'name', order: 'desc'} );
  const [showZero, setShowZero] = useState(true);
  const [zeroError, setZeroError] = useState('')

  const [currentBuild, setCurrentBuild] = useState([{id: 0}, {id: -1}, {id: -2}, {id: -3}, {id: -4}, {id: -5}])

  const [error, setError] = useState('');
  const [showRemove, setShowRemove] = useState(false);

  const itemToRemove = useRef(null);

  const nullId = useRef(-6)


  const tableRef = useRef(null);

  let isBuildFull = false;

  if (currentBuild.every(i => i.id > 0)) {
    isBuildFull = true;
  }

  console.log(isBuildFull + ' the build is full?')
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

   

    const handleShowOnlyChange = (e) => {
      console.log(e.target.value)
      const val = e.target.value;
      setShowOnly(val)
      let copy = [...allItems]
      let filtered = filterByCategory(val, copy)
      if (!showZero && sortBy.field != 'name' && sortBy.field != 'random') {
        console.log('filtering out all 0 values')
        filtered = filtered.filter(item => 
          item[sortBy.field] > 0
        )
      }
      setFilteredItems(filtered)
  }

  const handleChecked = ( e, boolVal) => { //called when show zero values (T, F) is checked

    e.stopPropagation();
    const currentField = sortBy.field;
    if (currentField == 'name' || currentField == 'random' || currentField == 'cost') {
      setZeroError('sort results by a criteria with non-zero values to use this option')
      return; 
    }//we only eliminate data if the field has a numerical value that can be a zero value
    setShowZero(boolVal);

  
    console.log('field is not name or random')

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
    if (!showZero && val != 'name' && val != 'random') {
      copy = copy.filter(item => 
        item[val] > 0
      )
    }
    
    sortByField(val, newOrder, copy);

    
    // console.log(sorted)
    setFilteredItems(copy);
    scrollToTop();

};

const handleItemClick = (item) => {
  console.log(item)
  if (item.id <= 0) return;
  itemToRemove.current = item;
  setShowRemove(true);
}

const handleRemoveClose = (action) => {
  console.log(action)
  setShowRemove(false) 
  if (action == 'cancel') return;

  const copy = [...currentBuild];
  const indexToRemove = currentBuild.findIndex(i => i.id == itemToRemove.current.id);

  const newBuild = [...currentBuild.slice(0, indexToRemove), ...currentBuild.slice(indexToRemove + 1), {id: nullId.current}];

  nullId.current = nullId.current - 1;
  setCurrentBuild(newBuild);

  
}

const handleAddBuild = () => {
  let summonerName = 'CorgiPartyTime'
  // console.log(import.meta.env.PROD)
  console.log(import.meta.env.VITE_RIOT_API_KEY);
  if (import.meta.env.PROD) {
    let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${import.meta.env.VITE_RIOT_API_KEY}`;
    
    const summoner = fetch(url).then(res => res.json()).then(json => console.log(json));
  }
  let url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${import.meta.env.VITE_RIOT_API_KEY}`;
    
  const summoner = fetch(url).then(res => res.json()).then(json => console.log(json));
}


  return (
    <div className='builder-container'>
      {/* <AddItemForm /> */}
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem'}} className='forMedia'>
    <Build items={currentBuild} handleItemClick={handleItemClick} showRemove={showRemove} setShowRemove={setShowRemove} itemToRemove={itemToRemove.current} handleRemoveClose={handleRemoveClose}/>
   
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem'}}>
    {
      error && 
      
        <div className='err-div' style ={{ outline: '3px solid #FF4500', padding: '0px 1.5rem', cursor: 'pointer'}} onClick={()=> setError('')}>
        <p>{error}
        </p>
        </div>
       
    }
      <div>
      <Stats items={currentBuild} wide = {true}/>
      </div>

    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems:'center' }}>
      {
        isBuildFull && <button onClick={handleAddBuild}>Add Build</button>
      }
      <div >
    <ItemFilters showOnly={showOnly}  handleChange={handleShowOnlyChange} showZero={showZero} setShowZero={setShowZero} handleChecked={handleChecked} />
    <div style={{height: '25px'}}>
    {zeroError && 
    <span onClick={() => setZeroError('')} style= {{color: '#FF4500', cursor: 'pointer'}} className='error'>{zeroError}</span>
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
  console.log(category)
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