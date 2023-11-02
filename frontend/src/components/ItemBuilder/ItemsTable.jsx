import React, {useState, useEffect, useRef} from 'react'
import {Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper } from '@mui/material'
import {statsMap} from '../../stats'
import AddItemMenu from './AddItemMenu'

const gradiantTop = 'linear-gradient( 0deg, hsl(281deg 40% 30%) 53%, hsl(296deg 41% 31%) 78%, hsl(309deg 44% 33%) 87%, hsl(318deg 49% 37%) 91%, hsl(325deg 52% 41%) 94%, hsl(332deg 54% 44%) 96%, hsl(337deg 55% 48%) 97%, hsl(343deg 58% 52%) 98%, hsl(349deg 65% 56%) 98%, hsl(355deg 73% 60%) 98%, hsl(2deg 81% 62%) 99%, hsl(9deg 89% 62%) 99%, hsl(16deg 95% 61%) 99%, hsl(22deg 99% 60%) 99%, hsl(28deg 100% 58%) 100%, hsl(34deg 100% 55%) 100%, hsl(40deg 100% 50%) 100%);';

const grandiantBot = 'linear-gradient( 180deg, hsl(281deg 40% 30%) 53%, hsl(296deg 41% 31%) 78%, hsl(309deg 44% 33%) 87%, hsl(318deg 49% 37%) 91%, hsl(325deg 52% 41%) 94%, hsl(332deg 54% 44%) 96%, hsl(337deg 55% 48%) 97%, hsl(343deg 58% 52%) 98%, hsl(349deg 65% 56%) 98%, hsl(355deg 73% 60%) 98%, hsl(2deg 81% 62%) 99%, hsl(9deg 89% 62%) 99%, hsl(16deg 95% 61%) 99%, hsl(22deg 99% 60%) 99%, hsl(28deg 100% 58%) 100%, hsl(34deg 100% 55%) 100%, hsl(40deg 100% 50%) 100%);';

const centerGradiant = 'radial-gradient(circle, rgba(98,51,119,1) 50%, rgba(98,51,119,1) 76%, rgba(98,51,119,1) 81%, rgba(254,170,0,1) 95%)';


const ItemsTable = ({items, handleSortChange, sortBy, tableRef, currentBuild, setCurrentBuild, setError}) => {

    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const selectedItemRef = useRef();
    const firstEmptySlot = useRef(0);

    const addItemIfShould = (item) => {

     
        const buildCopy = [...currentBuild.slice(0, firstEmptySlot.current), selectedItemRef.current, ...currentBuild.slice(firstEmptySlot.current + 1)];
        setCurrentBuild(buildCopy);
        setError('')
        window.scrollTo(0, 100)
      
    }


    const handleRowClick = (e, item) => {
        e.stopPropagation();
        if (open) {
            return;
        } else {
          const firstEmptyIndex  = currentBuild.findIndex(i => i.id <= 0);
          firstEmptySlot.current = firstEmptyIndex;
          if (firstEmptyIndex == -1) {//THERE ARE NO EMPTY SLOTS: DO SOMETHING ELSE 
            setError("You ran out of space!");
            window.scrollTo(0, 100)
            return;
          }
          if (currentBuild.find( i => item.id == i.id)) { //if the item is already in the build
            console.log('This item is already added to this build.');
            setError('This item is already added to this build.')
            window.scrollTo(0, 100)
            return;
            
          } if (item.hasOwnProperty('boots')) { //if the item we are trying to add is a boot, we need to check to see if we have any other boots already included first
            if (currentBuild.some(i => i.hasOwnProperty('boots'))){
               setError('You already got a pair of boots.');
               window.scrollTo(0, 100)
               return;
            }
          }
          if (item.hasOwnProperty('mythic')){
       
            if (currentBuild.some(i => i.hasOwnProperty('mythic'))) {
              setError('You can only have one mythic item.');
              window.scrollTo(0, 100)
              return;
            }
          }
            setSelectedId(item.id);
            setOpen(true);
            console.log(item.id)
        }
       

    }

    const handleClose = (value, id) => {
        setOpen(false);
        console.log(value + ' ' + id)
        if (value == 'cancel') {
            return;

        } else { //value must equal 'add' 
            //setSelectedId(id);
            addItemIfShould(selectedItemRef.current);
  
        }
      };
    
  return (
    <div >

    <TableContainer component={Paper} className='data-table' style={{backgroundColor: '#141823', marginTop: '2rem'}} sx={{  
      fontSize: '40px', 
    
    "&::-webkit-scrollbar": {
	  width: 15
    },
    "&::-webkit-scrollbar-track": {
	  backgroundColor: "rgb(3, 3, 3)"
    },
    "&::-webkit-scrollbar-thumb": {
	  backgroundColor: "#bf922a",
	  borderRadius: 2
    }
  }}
  ref={tableRef}
  >

    <Table aria-label="simple table" stickyHeader sx={{position: 'relative', }}
     > 
      <TableHead className='table-header' >
       
        <TableRow sx={{backgroundColor: '#572d6a'}} style={{backgroundColor: '#572d6a'}}>
        <TableCell onClick={ e => handleSortChange(e, 'random')} 
            className='order-random'
            sx={{ backgroundImage: 
              (sortBy.field == 'random') ?
              centerGradiant 
              :
              ''
            } }
        >
          random order
        </TableCell>
        <TableCell onClick={ e => handleSortChange(e, 'name')} sx={{ backgroundImage: 
        (sortBy.field == 'name' && sortBy.order == 'desc') ? grandiantBot :
        (sortBy.field == 'name' && sortBy.order == 'asc')
        ?
        gradiantTop
        : 
        ''
        } }
      style={{ position: 'sticky', left: '0', zIndex: 999}}
      >
          name
        </TableCell>
        {
          Object.entries(statsMap).map( ([fullName, stat ]) => 
          <TableCell key={stat} onClick={e => handleSortChange(e, fullName)} sx={{ backgroundImage: 
            (sortBy.field == fullName && sortBy.order == 'desc') ? grandiantBot :
            (sortBy.field == fullName && sortBy.order == 'asc')
            ?
            gradiantTop
            : 
            ''
            
          } }>
           
          {stat}
        
        </TableCell>
        )}
        </TableRow>
        </TableHead>
        <TableBody style = {{ backgroundColor: '#141823' }}>
            {
            items.length > 0 ? 
            items.map(item => 
                
            <TableRow  className='table-row' onClick={(e) => handleRowClick(e, item)} key={item.id} hover={true} >
                <TableCell component="th" scope="row" className="table-name" align="center" >
                <img src={ `/items/${item.id}.png`} alt={item.name} className='table-img'/>
            </TableCell>
            <TableCell component="th" scope="row" className="table-name" align="center" style={{ position: 'sticky', left: '0', backgroundColor: '#141823', opacity: '80%'}}>
              {item.name}
            </TableCell>

            {
                Object.keys(statsMap).map( key => 
                    <TableCell component="th" scope="row" className="table-name" align="center" key={key} >
                    {item[key]}
                  </TableCell>
                )
            }

            <AddItemMenu
            selectedId={selectedId}
            open={open}
            onClose={handleClose}
            items={items}
            selectedItem={selectedItemRef}
             />
            </TableRow>
         
         
             )
             :
            
             <TableRow className='empty-row'>
                
                <TableCell align="left"  style={{ height: "400px", color: 'white' }} colSpan={25}>No Matching Items</TableCell>
             </TableRow>
            
            }  
            

        </TableBody>
        </Table>
        </TableContainer>
       
  </div>
  )
}

export default ItemsTable