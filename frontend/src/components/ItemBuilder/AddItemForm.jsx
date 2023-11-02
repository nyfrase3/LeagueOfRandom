import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormGroup, FormLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const allRegions = []

const AddItemForm = () => {

    const [region, setRegion] = useState('NA1');

    const handleChange = () => {

    }

    const handleTextChange = (e) => {

    }

  return (
    <FormControl style={{ position: 'absolute', backgroundColor: 'red'}}>
    <FormLabel>Summoner Name</FormLabel>
    <TextField error={true} onChange={e => handleTextChange(e)}/>
    <FormGroup >
    <InputLabel id="region-select" className="label">Region</InputLabel>
        <Select
            labelId="region-select"
            id="region-select"
            value={region}
            label="name"
            onChange={handleChange}
        
            inputProps={{
                MenuProps: {
                    MenuListProps: {
                        sx: {
                            backgroundColor: '#1a1a1a',
                            color: 'rgba(255, 255, 255, 0.87)',
                            position: 'relative'
                        }
                    }
                }
            }}
          
        > <MenuItem value={'NA1'}>NA1</MenuItem>
    </ Select >
    </FormGroup>
    <Button>Submit</Button>
</FormControl>
  )
}

export default AddItemForm