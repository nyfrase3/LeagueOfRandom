import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControlLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import  {FormGroup, Checkbox}  from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { amber } from '@mui/material/colors';
import { palette } from '@mui/system';


const styles = theme => ({
    radio: {
      '&$checked': {
        color: '#4B8DF8'
      },
      '&$unChecked': {
        color: '#4B8DF8'
      }
    },
 
  })





const ItemFilters = ({showOnly, handleChange, showZero, setShowZero, handleChecked}) => {
    




  return (
    <div className='filters-flex'>
        <Box size="small" sx={{backgroundColor: '#141823', color: '#F7F4EF'}}>
        <div className='filters-flex'>
        <div className='radio-cont'>
        <FormLabel id="show-only" sx={{ fontWeight: '600', color: '#F7F4EF'}} >Show Only</FormLabel>
        <RadioGroup
        name="controlled-radio-buttons-group"
        value={showOnly}
        onChange={handleChange}
        className='radio-group'
        > 
        <FormControlLabel value="all" control={<Radio color='secondary'/>} label="all" />
         <FormControlLabel value="boots" control={<Radio color='secondary'/>} label="boots" />
        <FormControlLabel value="mythic" control={<Radio color='secondary'/>} label="mythics" />
        <FormControlLabel value="legendaries" control={<Radio color='secondary'/>} label="legendaries"/>
         </RadioGroup>
         </div>

         <div>

         <FormLabel id="show-zero" sx={{ fontWeight: '600', color: '#F7F4EF'}} >Show Zero Values</FormLabel>
         <FormGroup className='sub-group'>
         <FormControlLabel
            control={
              <Checkbox checked={showZero} onChange={e => handleChecked(e, true)} name="true"  sx={styles} color='secondary'/>
            }
            label="true"
          />
           <FormControlLabel
            control={
              <Checkbox checked={!showZero} onChange={e => handleChecked(e, false)} name="false"  sx={styles} color='secondary'/>
            }
            label="false"
          />
           </FormGroup>
         </div>
       

        
         </div>
        </Box>
    </div>
  )
}

export default ItemFilters