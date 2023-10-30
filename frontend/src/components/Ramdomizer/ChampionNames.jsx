import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
    "& label.Mui-focused": {
      color: "#bf922a"
    },
    minWidth: 200, 
    m: 1,
    color: 'rgba(255, 255, 255, 0.87'
  }


const ChampionNames = ({name, setName}) => {

    const [allNames, setAllNames] = useState([]);

    useEffect(()=> {
        fetch( `${import.meta.env.VITE_APP_URL}allChampions`).then( res => 
            res.json()).then(json => setAllNames(json))
        
    }, [])

    const handleChange = (e) => {
        setName(e.target.value);
    }

  return (
    <div className='name-select'>
        <h5 className='h5'>Champion Select</h5>
        <div>
         <Box sx={ style } size="small">
       
        <FormControl fullWidth variant="filled">
        <InputLabel id="name-select" className="label">Champion</InputLabel>
        <Select
            labelId="name-select"
            id="type-select"
            value={name}
            label="name"
            onChange={handleChange}
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
        > <MenuItem value={'ANY'}>ANY</MenuItem>

         {
            allNames.map(name => <MenuItem value={name.name} key={name.name}>{name.name}  </MenuItem>
            )
        }
        
        </Select>
        </FormControl>
        </Box>
        </div>
    </div>
  )
}

export default ChampionNames