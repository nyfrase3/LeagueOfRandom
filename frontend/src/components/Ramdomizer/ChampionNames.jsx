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

  const allNames = [{"name":"Aatrox"},{"name":"Ahri"},{"name":"Akali"},{"name":"Akshan"},{"name":"Alistar"},{"name":"Amumu"},{"name":"Anivia"},{"name":"Annie"},{"name":"Aphelios"},{"name":"Ashe"},{"name":"Aurelion Sol"},{"name":"Azir"},{"name":"Bard"},{"name":"Bel'Veth"},{"name":"Blitzcrank"},{"name":"Brand"},{"name":"Braum"},{"name":"Briar"},{"name":"Caitlyn"},{"name":"Camille"},{"name":"Cassiopeia"},{"name":"Cho'Gath"},{"name":"Corki"},{"name":"Darius"},{"name":"Diana"},{"name":"Dr. Mundo"},{"name":"Draven"},{"name":"Ekko"},{"name":"Elise"},{"name":"Evelynn"},{"name":"Ezreal"},{"name":"Fiddlesticks"},{"name":"Fiora"},{"name":"Fizz"},{"name":"Galio"},{"name":"Gangplank"},{"name":"Garen"},{"name":"Gnar"},{"name":"Gragas"},{"name":"Graves"},{"name":"Gwen"},{"name":"Hecarim"},{"name":"Heimerdinger"},{"name":"Illaoi"},{"name":"Irelia"},{"name":"Ivern"},{"name":"Janna"},{"name":"Jarvan IV"},{"name":"Jax"},{"name":"Jayce"},{"name":"Jhin"},{"name":"Jinx"},{"name":"K'Sante"},{"name":"Kai'Sa"},{"name":"Kalista"},{"name":"Karma"},{"name":"Karthus"},{"name":"Kassadin"},{"name":"Katarina"},{"name":"Kayle"},{"name":"Kayn"},{"name":"Kennen"},{"name":"Kha'Zix"},{"name":"Kindred"},{"name":"Kled"},{"name":"Kog'Maw"},{"name":"LeBlanc"},{"name":"Lee Sin"},{"name":"Leona"},{"name":"Lillia"},{"name":"Lissandra"},{"name":"Lucian"},{"name":"Lulu"},{"name":"Lux"},{"name":"Malphite"},{"name":"Malzahar"},{"name":"Maokai"},{"name":"Master Yi"},{"name":"Milio"},{"name":"Miss Fortune"},{"name":"Mordekaiser"},{"name":"Morgana"},{"name":"Naafiri"},{"name":"Nami"},{"name":"Nasus"},{"name":"Nautilus"},{"name":"Neeko"},{"name":"Nidalee"},{"name":"Nilah"},{"name":"Nocturne"},{"name":"Nunu & Willump"},{"name":"Olaf"},{"name":"Orianna"},{"name":"Ornn"},{"name":"Pantheon"},{"name":"Poppy"},{"name":"Pyke"},{"name":"Qiyana"},{"name":"Quinn"},{"name":"Rakan"},{"name":"Rammus"},{"name":"Rek'Sai"},{"name":"Rell"},{"name":"Renata Glasc"},{"name":"Renekton"},{"name":"Rengar"},{"name":"Riven"},{"name":"Rumble"},{"name":"Ryze"},{"name":"Samira"},{"name":"Sejuani"},{"name":"Senna"},{"name":"Seraphine"},{"name":"Sett"},{"name":"Shaco"},{"name":"Shen"},{"name":"Shyvana"},{"name":"Singed"},{"name":"Sion"},{"name":"Sivir"},{"name":"Skarner"},{"name":"Sona"},{"name":"Soraka"},{"name":"Swain"},{"name":"Sylas"},{"name":"Syndra"},{"name":"Tahm Kench"},{"name":"Taliyah"},{"name":"Talon"},{"name":"Taric"},{"name":"Teemo"},{"name":"Thresh"},{"name":"Tristana"},{"name":"Trundle"},{"name":"Tryndamere"},{"name":"Twisted Fate"},{"name":"Twitch"},{"name":"Udyr"},{"name":"Urgot"},{"name":"Varus"},{"name":"Vayne"},{"name":"Veigar"},{"name":"Vel'Koz"},{"name":"Vex"},{"name":"Vi"},{"name":"Viego"},{"name":"Viktor"},{"name":"Vladimir"},{"name":"Volibear"},{"name":"Warwick"},{"name":"Wukong"},{"name":"Xayah"},{"name":"Xerath"},{"name":"Xin Zhao"},{"name":"Yasuo"},{"name":"Yone"},{"name":"Yorick"},{"name":"Yuumi"},{"name":"Zac"},{"name":"Zed"},{"name":"Zeri"},{"name":"Ziggs"},{"name":"Zilean"},{"name":"Zoe"},{"name":"Zyra"}]


const ChampionNames = ({name, setName}) => {


    // useEffect(()=> {
    //     fetch( `${import.meta.env.VITE_APP_URL}allChampions`).then( res => 
    //         res.json()).then(json => setAllNames(json))
        
    // }, [])

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
            allNames.map(name => <MenuItem value={name.name} key={name.name}> {name.name} </MenuItem>
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