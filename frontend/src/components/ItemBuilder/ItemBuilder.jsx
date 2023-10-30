import React, {useState, useEffect, useRef} from 'react'
import {Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper } from '@mui/material'
import {statsMap} from '../../stats'
import ItemsTable from './ItemsTable';
import ItemFilters from './ItemFilters'
import Build from '../Build';

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

  const [currentBuildIds, setCurrentBuildIds] = useState([0, -1, -2, -3, -4, -5])

  const nullId = useRef(-6)



  const tableRef = useRef(null);

  function scrollToTop() {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  }

    useEffect( () => {
      fetch(`${import.meta.env.VITE_APP_URL}allItems`).then( res => 
      res.json()).then(json => {
        setAllItems(Object.values(json))
        setFilteredItems(Object.values(json))
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

  const handleChecked = ( e, boolVal) => {

    e.stopPropagation();
    setShowZero(boolVal);
    const currentField = sortBy.field;

    if (currentField == 'name' || currentField == 'random' || currentField == 'cost') return; //we only eliminate data if the field has a numerical value that can be a zero value
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

}

const handleAddItemClick = (id) => {

}


  return (
    <div className='builder-container'>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
    <Build />
    <ItemFilters showOnly={showOnly}  handleChange={handleShowOnlyChange} showZero={showZero} setShowZero={setShowZero} handleChecked={handleChecked} />
    </div>
    <ItemsTable items={filteredItems} showOnly={showOnly} sortBy={sortBy}  handleSortChange={handleSortChange} tableRef={tableRef} /> 
    
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