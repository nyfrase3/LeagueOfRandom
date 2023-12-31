import React, {useState, useRef} from 'react'

const SearchBar = ({items, addItem, selectedItem}) => {

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);


  const searchResRef = useRef();

  const closeSearchResults = (e) => {
    if (searchResRef.current && e.target !== searchResRef.current && !searchResRef.current.contains(e.target))
    {
      setShowSearchResults(false)
    }
  }

  const handleItemClick = (e, item) => {
    e.stopPropagation();
    selectedItem.current = item;
    addItem(e, item);
  }

  const onChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if(e.target.value.length <= 0) {
      setSearchResults([])
      return;

    }
    const regEx = new RegExp(`^${e.target.value}`, 'i')
    setSearchResults(items.filter(item => item.name.match(regEx)));
  }
  document.addEventListener('mousedown', closeSearchResults);

  return (
    <div style={{ marginLeft: '1rem', position: 'relative'}} ref={searchResRef}>
        <input type='text' placeholder='search items' value={searchInput} onChange={(e) => onChange(e)} onFocus={() => setShowSearchResults(true)} style={{ backgroundColor: '#141823', padding: '4px 5px', borderRadius: '5px'}}/>
        {
          showSearchResults && 
          <ul style={{ zIndex: '1000', position: 'absolute', backgroundColor: '#F7F4EF', display: 'flex', flexDirection: 'column', gap: '3px', width: '183px'}} >
            {
              searchResults.map( item => 
                <li onClick={e => handleItemClick(e, item)} style={{cursor: 'pointer', lineHeight: '1.75rem'}} key={item.name} className='search-res'>{item.name}</li>
              )
            }
          </ul>
        }
    </div>
  )
}

export default SearchBar