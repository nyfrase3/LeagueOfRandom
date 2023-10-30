import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const ItemFilters = ({boots, setBoots, mainStat, setMainStat, none, setNone, all, setAll, subStats, setSubStats}) => {

  useEffect( ()=> {
    const boolVals = Object.values(subStats);

    let allLocal = false;
    let noneLocal = true;

    for (let i = 0; i < boolVals.length; i++) {
      if (boolVals[i]) {
        noneLocal = false;
        break;
      } 
    }

    for (let i = 0; i < boolVals.length; i++) {
      if (!boolVals[i]) {
        allLocal = false;
        break;
      } 
      allLocal = true;
    }
    
    setAll(allLocal)
    setNone(noneLocal)

    if (mainStat == 'ALL') {
      handleAllChecked()
    }


  }, [subStats.health, subStats.percentattackspeed, subStats.mana, subStats.abilityhaste, subStats.armor, subStats.magicresist, subStats.attackdamage, subStats.abilitypower])

  const style = {
    "& label.Mui-focused": {
      color: "#bf922a"
    },
    minWidth: 200, 
    m: 1,
    color: 'rgba(255, 255, 255, 0.87'
  }

  const handleBootsChange = (e) => {
    setBoots(e.target.value); 
  }

  
  const handleMainStatChange = (e) => {
    setMainStat(e.target.value); 

    if (e.target.value == 'ALL') {
      handleAllChecked();
    } else {
      setSubStats({
        ...subStats,
        [e.target.value]: true,
      })
  
    }
  
  }

  const handleSubStatChange = (e) => {
 {
      setSubStats({
        ...subStats,
        [e.target.name]: e.target.checked,
      }
      )
    }
  
  }

  const handleAllChecked = () => {
    const newStats = {};
    Object.keys(subStats).map(stat => {
      newStats[stat] = true;
    })
    setSubStats( newStats);
  }

  const handleNoneChecked = () => {

    const newStats = {};
    Object.keys(subStats).map(stat => {
      newStats[stat] = false;
    })
    setSubStats( newStats);
  }


  return (
    <div className='filter-cont'>

    <h5>Item Filters</h5>

    <Box sx={ style } size="small">
        <FormControl fullWidth variant="filled">
        <InputLabel id="type-select" className="label">Boots</InputLabel>
        <Select
            labelId="boots-select"
            id="boots-select"
            value={boots}
            label="Boots"
            onChange={handleBootsChange}
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
            <MenuItem value={'NONE'}>NONE</MenuItem>
            <MenuItem value={"Boots of Swiftness"}>Boots of Swiftness</MenuItem>
            <MenuItem value={"Sorcerer's Shoes"}>Sorcerer's Shoes</MenuItem>
            <MenuItem value={"Mercury's Treads"} >Mercury's Treads</MenuItem>
            <MenuItem value={'Mobility Boots'}>Mobility Boots</MenuItem>
            <MenuItem value={'Ionian Boots of Lucidity'}>Ionian Boots of Lucidity</MenuItem>
        </Select>
        </FormControl>

        <FormControl fullWidth variant="filled">
        <InputLabel id="class-select" className="label">Main Stat</InputLabel>
        <Select
            labelId="MainStat-select"
            id="MainStat-select"
            value={mainStat}
            label="main-stat"
            onChange={handleMainStatChange}
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
            <MenuItem value={'attackdamage'}>Attack Damage</MenuItem>
            <MenuItem value={"abilitypower"}>Ability Power</MenuItem>
            <MenuItem value={"health"} >Health</MenuItem>
            <MenuItem value={"mana"}>Mana</MenuItem>
            <MenuItem value={'percentcriticalstrikechance'}>Crit</MenuItem>
            <MenuItem value={'armor'}>Armor</MenuItem>

        </Select>
        </FormControl>

   <InputLabel id="class-select" className="label">Sub Stats
   <FormGroup className='sub-group'>
          <FormControlLabel
            control={
              <Checkbox checked={all} onChange={handleAllChecked} name="all" />
            }
            label="All"
          />
          <FormControlLabel
            control={
              <Checkbox checked={none} onChange={handleNoneChecked} name="none" />
            }
            label="None"
          />
            </FormGroup>
   </InputLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={subStats.attackdamage} onChange={handleSubStatChange} name="attackdamage" />
            }
            label="Attack Damage"
          />
          <FormControlLabel
            control={
              <Checkbox checked={subStats.abilitypower} onChange={handleSubStatChange} name="abilitypower" />
            }
            label="Ability Power"
          />
          <FormControlLabel
            control={
              <Checkbox checked={subStats.health} onChange={handleSubStatChange} name="health" />
            }
            label="Health"
          />
          <FormControlLabel
            control={
              <Checkbox checked={subStats.mana} onChange={handleSubStatChange} name="mana" />
            }
            label="Mana"
          />
          <FormControlLabel
            control={
              <Checkbox checked={subStats.percentattackspeed} onChange={handleSubStatChange} name="percentattackspeed" />
            }
            label="Attack Speed"
          />
          <FormControlLabel
            control={
              <Checkbox checked={subStats.abilityhaste} onChange={handleSubStatChange} name="abilityhaste" />
            }
            label="Ability Haste"
          />
             <FormControlLabel
            control={
              <Checkbox checked={subStats.armor} onChange={handleSubStatChange} name="armor" />
            }
            label="Armor"
          />
          <FormControlLabel
            control={
              <Checkbox checked={subStats.magicresist} onChange={handleSubStatChange} name="magicresist" />
            }
            label="Magic Resist"
          />
        </FormGroup>
            

     </Box>
    
    </div>
  )
}

export default ItemFilters