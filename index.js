const express = require('express');
const cors = require("cors");
const db = require('./database');
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

app.get('/randomChampion/:type/:classType', async (req, res, next) => { 

  const { type, classType } = req.params;

  let result;
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
  // await db.end();
  console.log(result.rows)
  res.send(result.rows)
})

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

})

app.post('/randomItems/:boots/:mainStat', async (req, res, next) => {

  const {boots, mainStat} = req.params;
  let numLegendaries = 4;
  let randomBoot = null;
  let randomMythic = null; 
  let randomLegendaries = [];
  let build = [];

  if (boots == 'NONE') {
    numLegendaries++;
  } else {

      if (boots == 'ALL') {
        randomBoot = await db.query('SELECT * FROM items JOIN boots ON items.id = boots.id ORDER BY RANDOM() LIMIT 1;')
      } else {
        randomBoot = await db.query(`SELECT * FROM items WHERE item.name = ${boots}`)
      }
  }

  if (mainStat == 'ALL') {
    randomMythic = await db.query(mythicQuery);
  }


  const subStats = req.body;


  console.log('boots: ' + boots + " mainstat: " + mainStat)

})
// app.get('/nextChampion/:id', async(req, res, next) => {
//   const {id} = req.params;
//   console.log('in test route ' + id)
//   const result = await db.query('SELECT * FROM champions WHERE id = $1', [id]);
//   console.log(result.rows)
//   res.send(result.rows)

// })

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}