import React, {useState} from 'react'
import {Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper } from '@mui/material'
import Item from './components/Item'
import { statsMap } from './stats'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';



const BuildsTable = ({builds, deleteBuild, editBuild }) => {
  const [showDeleteBuild, setShowDeleteBuild] = useState(false);
  const [showEditBuild, setShowEditBuild] = useState(false)
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (id) => {

    setShowDeleteBuild(true);
    setSelectedId(id);
  }

  const handleEdit = (id) => {
    setShowEditBuild(true);
    setSelectedId(id);
  }

  return (
    <div style={{margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
        <TableContainer component={Paper} style={{backgroundColor: '#141823', marginTop: '2rem', width: '80%'}} sx={{  
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
  >

    <Table aria-label="simple table" stickyHeader sx={{position: 'relative' }}
     > 
      <TableHead className='table-header' style={{}}>
       
        <TableRow sx={{backgroundColor: '#572d6a'}} style={{backgroundColor: '#572d6a', cursor: 'default'}}>
        <TableCell >
          champion
        </TableCell>
        <TableCell >
          Item 1
        </TableCell>
        <TableCell >
          Item 2
        </TableCell>
        <TableCell >
          Item 3
        </TableCell>
        <TableCell >
          Item 4
        </TableCell>
        <TableCell >
          Item 5
        </TableCell>
        <TableCell >
          Item 6
        </TableCell>
        <TableCell >
          User
        </TableCell>
        <TableCell >
         Random
        </TableCell>
        <TableCell >
          Date Created
        </TableCell>
        
        </TableRow>
        </TableHead>
        <TableBody style = {{ backgroundColor: '#141823'}} className='build-tbl'>
            {
            builds.length > 0 ? 
            builds.map(build => 
     
            <TableRow  className='table-row' key={build.id} style={{cursor: 'default', position: 'relative'}}>

            <td style={{ position: 'fixed', left: '5.5vw', width: '5vw', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }} > 
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(build.id)} style={{fontSize: '2.35rem', cursor: 'pointer'}} className='trash-icon'/>

            {
              showDeleteBuild && build.id == selectedId  && 
              <>
              <span style={{ fontSize: '0.7rem', width: 'fit-content', margin: '15px 0px 10px 0px', backgroundColor: '#cccccc', padding: '0px 5px', borderRadius: '8px', fontWeight: '700', color: 'rgb(203, 20, 20)' }} className='build-btn' onClick={ ()=> { deleteBuild(selectedId); setShowDeleteBuild(false)}}>delete</span> 
              <span style={{ fontSize: '0.7rem', width: 'fit-content', backgroundColor: '#cccccc', padding: '0px 5px', borderRadius: '8px', fontWeight: '700' }}  onClick={ ()=> setShowDeleteBuild(false)} className='build-btn'>cancel</span>
              </>
            }
            </td>


                <TableCell component="th" scope="row" className="table-name" align="center" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', outline: 'none', minHeight: '74px'}}>
                  <span>{build.champion}</span>
                <img src={`/champions/${(build.champion).replaceAll(/['\s]/g, '')}.jpg`} alt={build.champion } style={{ height: '60px', width: '60px'}} />
              </TableCell>
              
              {build?.items.map( item => 
     
                  <TableCell component="th" scope="row" className="table-name" align="center" key={item.id} >
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1px'}}>
                  <span style={{maxWidth: '120px', overflow: 'hidden', letterSpacing: '-0.8px'}}>{item.name}</span>
                   <img src={`/items/${item.id}.png`}  style={{position: 'relative', height: '55px', width: '55px' }}/>
                   </span>
                  </TableCell>
          
         
              )}
                   <TableCell  component="th" scope="row" className="table-name" align="center" >
                   {build.username}
          
              </TableCell>
               <TableCell component="th" scope="row" className="table-name" align="center" >
                   {
                    build.random ? <FontAwesomeIcon icon={faCheck} /> : ''
                   }
          
              </TableCell>
              <TableCell component="th" scope="row" className="table-name" align="center" >
                   {formatTimeStamp(build.date_created)}
          
              </TableCell>
        
          
              <td style={{ position: 'fixed', right: '5.5vw', width: '5vw', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }} > 
            <FontAwesomeIcon icon={faPen} onClick={() => handleEdit(build.id)} style={{fontSize: '2.35rem', cursor: 'pointer'}} className='trash-icon'/>

            {
              showEditBuild && build.id == selectedId  && 
              <>
              <span style={{ fontSize: '0.7rem', width: 'fit-content', margin: '15px 0px 10px 0px', backgroundColor: '#cccccc', padding: '0px 5px', borderRadius: '8px', fontWeight: '700', color: 'rgb(203, 20, 20)' }} className='build-btn' onClick={ ()=> { editBuild(selectedId); setShowEditBuild(false)}}>edit</span> 
              <span style={{ fontSize: '0.7rem', width: 'fit-content', backgroundColor: '#cccccc', padding: '0px 5px', borderRadius: '8px', fontWeight: '700' }}  onClick={ ()=> setShowEditBuild(false)} className='build-btn'>cancel</span>
              </>
            }
            </td>

            </TableRow>

             )
             :
             <>
             <TableRow className='empty-row'>
         
                <TableCell align="left"  style={{ height: "480px", color: 'white', margin: '0' }} colSpan={25}>No Builds For This User</TableCell>
             </TableRow>
             
             </>
            }  
            

        </TableBody>
        </Table>
        </TableContainer>
    </div>
  )
}

function formatTimeStamp(timestamp) {
  const date = new Date(timestamp);
  const localTimeString = date.toLocaleString();
  return localTimeString; 
}

export default BuildsTable