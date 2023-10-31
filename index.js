const express = require('express');
const cors = require("cors");
const db = require('./database');
const fs = require('fs');
const https = require("https"); 
const bodyParser = require("body-parser");

require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.listen(3000, () => console.log("Server is running"));


app.get('/randomChampion', async (req, res, next) => { //get a random champion from the pool of ALL champions
  const randomInt = getRandomNumber(1, 165);
  const result = await db.query('SELECT * FROM champions WHERE id = $1', [randomInt])
  // await db.end();
  res.send(result.rows)
})


app.get('/randomChampion/:name/:type/:classType', async (req, res, next) => { 

  const { name, type, classType } = req.params;
  
  let result;

  if (name == 'ANY') {
    if (type == 'ALL' && classType == 'ALL') { //get a random champion from the pool of ALL champions
      const randomInt = getRandomNumber(1, 165);
      result = await db.query('SELECT * FROM champions WHERE id = $1', [randomInt])
    }
    else if (classType == 'ALL'){ //only type has a value
      result = await db.query('SELECT * FROM champions WHERE type = $1 ORDER BY RANDOM() LIMIT 1', [type] );
    } else if (type == 'ALL') { // only classType has a value
      result = await db.query('SELECT * FROM champions WHERE class = $1 OR subclass = $1 ORDER BY RANDOM() LIMIT 1', [classType]);
    } 
    else { //both attributes are given values
      result = await db.query('SELECT * FROM champions WHERE (type = $1) AND (class = $2 OR subclass = $2) ORDER BY RANDOM() LIMIT 1', [type, classType]);
    }
  } else { // the user has specified a specific champion
    const query = `SELECT * FROM CHAMPIONS WHERE name = '${name}';`;
   
    result = await db.query(query);
  }
  
  res.send(result.rows)
});


app.get('/randomItems', async (req, res, next) => {
  const build = []; //an array that stores all 6 items for the build;
  
  let mythicQuery = 'SELECT * FROM items JOIN mythics ON items.id = mythics.id ORDER BY RANDOM();';
  let mythicResult = await db.query(mythicQuery);
  // console.log(mythicResult.rows)
  let bootsQuery = 'SELECT * FROM items JOIN boots ON items.id = boots.id ORDER BY RANDOM();';
  let bootsResult = await db.query(bootsQuery);
  // console.log(bootsResult.rows)
  let legendaryItemsQuery = 'SELECT * FROM items WHERE (id NOT IN (SELECT id FROM mythics) AND id NOT IN (SELECT id FROM boots)) ORDER BY RANDOM()';
  let legendaryResult = await db.query(legendaryItemsQuery);

  build[0] = mythicResult.rows[0];
  build[1] = bootsResult.rows[0];
  for (let i = 2, j = 0; i < 6; i++, j++) {
    build[i] = legendaryResult.rows[j];
  }
  res.send(build);

});


app.post('/randomItems/:boots/:mainStat', async (req, res, next) => {

  const {boots, mainStat} = req.params;
  let numLegendaries = 4;
  let randomBoot = null;
  let randomMythic = await getMythic(mainStat);
  const subStats = req.body;
  let build = [];

  build[0] = randomMythic;

  if (boots == 'NONE') {
    numLegendaries++;
  } else {

      if (boots == 'ALL') {
        randomBoot = await db.query('SELECT * FROM items JOIN boots ON items.id = boots.id ORDER BY RANDOM() LIMIT 1;')
      } else {
        randomBoot = await db.query(`SELECT * FROM items WHERE name = $1`, [boots])
      }
  }

    if (randomBoot) {
      build.push(randomBoot.rows[0]);
    }

  let randomLegendaries = await getLegendaries(mainStat, subStats);

  for (let i = build.length, j = 0; i < 6; i++, j++) {
    build[i] = randomLegendaries[j];
  }

  res.send(build);

});

app.get('/allItems', async (req, res, next) => {
  const results = await db.query('SELECT * FROM items');
  console.log(results.rows[0])
  const data = {};
  results.rows.map( row => data[row.id] = row  );

  const bootIds = await db.query('SELECT id FROM boots');
  const mythicIds = await db.query('SELECT id FROM mythics');
  bootIds.rows.map(id => data[id.id]['boots'] = true);
  mythicIds.rows.map(id =>  data[id.id]['mythic'] = true);

  res.send(Object.values(data).sort((a, b) => (a.name > b.name ? 1 : -1)));
})


app.get('/allChampions', async (req, res, next) => {
  const namesResult = await db.query('SELECT name FROM champions ORDER BY name asc');
  res.send(namesResult.rows);
})


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

async function getMythic (mainStat) {
  let mythicResult;
  if (mainStat == 'ALL') {
     mythicResult = await db.query('SELECT * FROM items JOIN mythics ON items.id = mythics.id ORDER BY RANDOM() LIMIT 1;');
  } else {
    mythicResult = await db.query(`SELECT * FROM items JOIN mythics ON items.id = mythics.id WHERE ${mainStat} > 0 ORDER BY RANDOM() LIMIT 1;`);
  } 
  
  return mythicResult.rows[0];
};


async function getLegendaries (mainStat, subStats) {

  let legendaryItemsQuery = 'SELECT * FROM items WHERE (id NOT IN (SELECT id FROM mythics) AND id NOT IN (SELECT id FROM boots ) ';

  const statsSet = new Set();
  statsSet.add(mainStat);
  Object.keys(subStats).map(key => {
    statsSet.add(key);
  })

  statsSet.delete('ALL');

  if (statsSet.size > 0) {
    legendaryItemsQuery += " AND ( "
    let statsArr = Array.from(statsSet);
    for ( let i = 0; i < statsSet.size; i++) {
      legendaryItemsQuery += `${statsArr[i]} > 0`

      if ( i >= statsArr.length - 1) {
        legendaryItemsQuery += ' )'
      } else {
        legendaryItemsQuery += ' OR '
      }
      
    }
  }
 
  legendaryItemsQuery += ') ORDER BY RANDOM();';
  

  // console.log(legendaryItemsQuery);
  let legendaryResult = await db.query(legendaryItemsQuery);
  return legendaryResult.rows;

};

app.get('/api/allChampions', async (req, res, next) => {
  const namesResult = await db.query('SELECT * FROM champions ORDER BY name asc');
  let query = 'INSERT INTO champions (name, title, class, subclass, type) VALUES ';
  namesResult.rows.map(row => {
    query += `( '${row.name}', '${row.title}','${row.class}', '${row.subclass}', '${row.type}' ), `
  });
  query += ';';

  fs.writeFile("C:\\Users\\nyfra\\OneDrive\\Desktop\\Queries\\champions.txt", query, (err) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("File written successfully\n"); 
      console.log("The written has the following contents:"); 
    } 
  }); 
  res.send(namesResult.rows);
})

app.get('/api/allItems', async (req, res, next) => {
  const itemsResult = await db.query('SELECT * FROM items ORDER BY name asc');

  let query = 'INSERT INTO items (id, name, cost, percentattackspeed, movespeed, magicpenetration, abilitypower, mana, health, abilityhaste, attackdamage, armor, magicresist, percenttenacity, percentomnivamp, percentmovespeed, percentcriticalstrikechance, lethality, percentbasemanaregen, percenthealandshieldpower, percentcriticalstrikedamage, percentarmorpenetration, percentbasehealthregen, percentlifesteal, percentmagicpenetration) VALUES ';
  itemsResult.rows.map(row => {
    query += `( ${row.id}, '${(row.name).replace("'", "''")}', ${row.cost}, ${row.percentattackspeed}, ${row.movespeed}, ${row.magicpenetration}, ${row.abilitypower}, ${row.mana}, ${row.health}, ${row.abilityhaste}, ${row.attackdamage}, ${row.armor}, ${row.magicresist}, ${row.percenttenacity}, ${row.percentomnivamp}, ${row.percentmovespeed}, ${row.percentcriticalstrikechance}, ${row.lethality}, ${row.percentbasemanaregen}, ${row.percenthealandshieldpower}, ${row.percentcriticalstrikedamage}, ${row.percentarmorpenetration}, ${row.percentbasehealthregen}, ${row.percentlifesteal}, ${row.percentmagicpenetration} ), `
  });
  query += ';';

  fs.writeFile("C:\\Users\\nyfra\\OneDrive\\Desktop\\Queries\\items.txt", query, (err) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("File written successfully\n"); 
      console.log("The written has the following contents:"); 
    } 
  }); 
  res.send(itemsResult.rows);
})

app.get('/api/allBoots', async (req, res, next) => { 
  const result = await db.query('SELECT * FROM boots;')
  let query = 'INSERT INTO BOOTS (id) VALUES '
  for ( let row of result.rows) {
    query += `(${row.id}), `;
  }
  query += ';';

  fs.writeFile("C:\\Users\\nyfra\\OneDrive\\Desktop\\Queries\\boots.txt", query, (err) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("File written successfully\n"); 
      console.log("The written has the following contents:"); 
    } 
  }); 
  res.send(result.rows);

})

app.get('/api/allMythics', async (req, res, next) => { 
  const result = await db.query('SELECT * FROM mythics;')
  let query = 'INSERT INTO mythics (id) VALUES '
  for ( let row of result.rows) {
    query += `(${row.id}), `;
  }
  query += ';';

  fs.writeFile("C:\\Users\\nyfra\\OneDrive\\Desktop\\Queries\\mythics.txt", query, (err) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("File written successfully\n"); 
      console.log("The written has the following contents:"); 
    } 
  }); 
  res.send(result.rows);
})