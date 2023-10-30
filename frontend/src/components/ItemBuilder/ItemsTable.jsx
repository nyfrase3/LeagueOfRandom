import React, {useState, useEffect} from 'react'
import {Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper } from '@mui/material'
import {statsMap} from '../../stats'
import AddItemMenu from './AddItemMenu'

const gradiantTop = 'linear-gradient( 180deg, hsl(42deg 64% 46%) 0%, hsl(42deg 59% 43%) 0%, hsl(42deg 55% 41%) -1%, hsl(42deg 51% 38%) -1%, hsl(42deg 46% 35%) -1%, hsl(42deg 41% 33%) 0%, hsl(42deg 37% 30%) 1%, hsl(42deg 32% 28%) 2%, hsl(42deg 28% 25%) 4%, hsl(42deg 23% 23%) 6%, hsl(44deg 18% 20%) 11%, hsl(42deg 14% 18%) 17%, hsl(43deg 9% 15%) 27%, hsl(40deg 5% 13%) 47%, hsl(0deg 0% 10%) 100% )';

const grandiantBot = 'linear-gradient( 0deg, hsl(42deg 64% 46%) 0%, hsl(42deg 59% 43%) 0%, hsl(42deg 55% 41%) -1%, hsl(42deg 51% 38%) -1%, hsl(42deg 46% 35%) -1%, hsl(42deg 41% 33%) 0%, hsl(42deg 37% 30%) 1%, hsl(42deg 32% 28%) 2%, hsl(42deg 28% 25%) 4%, hsl(42deg 23% 23%) 6%, hsl(44deg 18% 20%) 11%, hsl(42deg 14% 18%) 17%, hsl(43deg 9% 15%) 27%, hsl(40deg 5% 13%) 47%, hsl(0deg 0% 10%) 100%)';

const centerGradiant = 'radial-gradient(circle, rgba(26,26,26,0.8653920807453416) 79%, rgba(207,158,45,1) 98%)';


const ItemsTable = ({items, handleSortChange, sortBy, tableRef}) => {

    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    const handleRowClick = (e, id) => {
        e.stopPropagation();
        if (open) {
            return;
        } else {
            setSelectedId(id);
            setOpen(true);
            console.log(id)
        }
       

    }

    const handleClose = (value, id) => {
        setOpen(false);
        console.log(value + ' ' + id)
        if (value == 'cancel') {
            return;

        } else { //value must equal 'add' 
            setSelectedId(id)
        }
      };
    
  return (
    <div >

    <TableContainer component={Paper} className='data-table'  sx={{  
      fontSize: '40px'
    
    ,"&::-webkit-scrollbar": {
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

    <Table aria-label="simple table" stickyHeader sx={{position: 'relative' }} 
     > 
      <TableHead className='table-header'>
       
        <TableRow >
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
        <TableBody style = {{ backgroundColor: '#302f2f' }}>
            {
            items.length > 0 ? 
            items.map(item => 
                
            <TableRow  className='table-row' onClick={(e) => handleRowClick(e, item.id)} key={item.id} hover={true} >
                <TableCell component="th" scope="row" className="table-name" align="center" >
                <img src={ `/items/${item.id}.png`} alt={item.name} className='table-img'/>
            </TableCell>
            <TableCell component="th" scope="row" className="table-name" align="center" style={{ position: 'sticky', left: '0', backgroundColor: '#302f2f'}}>
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