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
      }
    },
    checked: {}
  })





const ItemFilters = ({showOnly, handleChange, showZero, setShowZero, handleChecked}) => {
    
   const style = {
        backgroundColor: '#572d6a'
    }



  return (
    <div className='filters-flex'>
        <Box sx={ style } size="small">
        <div className='filters-flex'>
        <div className='radio-cont'>
        <FormLabel id="show-only" sx={{ fontWeight: '600'}} >Show Only</FormLabel>
        <RadioGroup
        name="controlled-radio-buttons-group"
        value={showOnly}
        onChange={handleChange}
        className='radio-group'
        > 
        <FormControlLabel value="all" control={<Radio  color='secondary' />} label="all" />
         <FormControlLabel value="boots" control={<Radio color='secondary'/>} label="boots" />
        <FormControlLabel value="mythic" control={<Radio color='secondary'/>} label="mythics" />
        <FormControlLabel value="legendaries" control={<Radio color='secondary'/>} label="legendaries"/>
         </RadioGroup>
         </div>

         <div>

         <FormLabel id="show-zero" sx={{ fontWeight: '600'}} >Show Zero Values</FormLabel>
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