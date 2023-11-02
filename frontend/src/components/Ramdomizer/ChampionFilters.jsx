import React, {useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ChampionFilters = ({type, setType, classState, setClassState}) => {
  

    const handleTypeChange = (e) => {
        console.log(e.target.value)
        setType(e.target.value); 
    }

    const handleClassChange = (e) => {
        console.log(e.target.value)
        setClassState(e.target.value);
    }

    const style = {
        "& label.Mui-focused": {
          color: "#bf922a"
        },
        minWidth: 200, 
        m: 1,
        color: 'rgba(255, 255, 255, 0.87'
      }

  return (
    <div className='filter-cont' >
    <h5>Champion Filters</h5>
    <Box sx={ style } size="small">
        <FormControl fullWidth variant="filled">
        <InputLabel id="type-select" className="label">Dmg Type</InputLabel>
        <Select
            labelId="type-select"
            id="type-select"
            value={type}
            label="Type"
            onChange={handleTypeChange}
            inputProps={{
                MenuProps: {
                    MenuListProps: {
                        sx: {
                            backgroundColor: '#141823',
                            color: 'rgba(255, 255, 255, 0.87)'
                        }
                    }
                }
            }}
            className='type-select'
        >
            <MenuItem value={'ALL'}>ALL</MenuItem>
            <MenuItem value={'AD'}>AD</MenuItem>
            <MenuItem value={'AP'}>AP</MenuItem>
        </Select>
        </FormControl>

        <FormControl fullWidth variant="filled">
        <InputLabel id="class-select" className="label">Class</InputLabel>
        <Select
            labelId="dtype-select"
            id="class-select"
            value={classState}
            label="class"
            onChange={handleClassChange}
            inputProps={{
                MenuProps: {
                    MenuListProps: {
                        sx: {
                            backgroundColor: '#1a1a1a',
                            color: 'rgba(255, 255, 255, 0.87)'
                        }
                    }
                }
            }}
            className='type-select'
        >
            <MenuItem value={'ALL'}>ALL</MenuItem>
            <MenuItem value={'Tank'}>TANK</MenuItem>
            <MenuItem value={'Assassin'}>ASSASSIN</MenuItem>
            <MenuItem value={'Marksman'}>MARKSMAN</MenuItem>
            <MenuItem value={'Support'}>SUPPORT</MenuItem>
            <MenuItem value={'Fighter'}>FIGHTER</MenuItem>

        </Select>
        </FormControl>
     </Box>
    </div>
  )
}

export default ChampionFilters