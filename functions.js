const fs = require('fs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

const championData = require('./champions.json');
const itemData = require('./items.json');
const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'league',
  password: process.env.dbpassword,
  port: 5432,
})
client.connect(function(err, client, done) {
  if (err) throw err;
  console.log("Connected!");
});

function cleanData(data) {
    const newData = [];

    Object.values(data).map(item => {
        const temp = {name: item.name, title: item.title, tags: item.tags }
        newData.push(temp);
    })
    return newData;
}


// const result = cleanData(championData.data);


const championUrl = `https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion/`



const insertChampion = async champion => {
    const championArr = [champion.name, champion.title, champion.tags[0]];
    if (champion.tags[1]) {
        championArr.push(champion.tags[1]);
    }
    let query;
    if (championArr.length == 3) {
        query = 'INSERT INTO "champions" ("name", "title", "class")  VALUES ($1, $2, $3)'
    } else {
        query = 'INSERT INTO "champions" ("name", "title", "class", "subclass")  VALUES ($1, $2, $3, $4)'
    }
 
    try {
        client.query(query, championArr);
    }
    catch(err){
        console.log(err);
    }
}

const statsMap = {
    FlatPhysicalDamageMod: 'ad',
    FlatHPPoolMod: 'hp',
    FlatMPPoolMod: 'mana',
    FlatMagicDamageMod: 'mp',
    FlatMovementSpeedMod: 'ms',
    PercentAttackSpeedMod: 'percentAs',
    FlatArmorMod: 'armor',
    FlatCritChanceMod: 'critChance',
    PercentMovementSpeedMod: 'percentMs',
    FlatSpellBlockMod: 'mr',
    PercentLifeStealMod: 'percentLifesteal'

}

const cleanItemData = item => {

    const filteredData = []
    const tags = [];
    const stats = [];

    Object.entries(item.data).map( ([id, item]) => {
        if ( ((item.gold.base > 1300 && item.gold.purchasable == true) || (item.tags.includes('Boots') && item.gold.base > 300 ) )) {
            // console.log(item)
            item.tags.map( tag => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            })

            const obj = {};
            let statsArray = [];
            let statsObj = {};
            let passive;
            let mythic = false;
            let boots = false;
            if (item.description.includes('<rarityMythic>')) {
                mythic = true;
            }
            if (item.tags.includes('Boots')){
                boots = true;
            }
            const indexOfStatsStart = item.description.indexOf('<stats>');
            const indexOfStatsEnd = item.description.indexOf('</stats>');
            let statsString = item.description.substr(indexOfStatsStart + 7, indexOfStatsEnd).replace(/<[^>]*>?/gm, ' ')
        //   console.log(statsString)
            statsArray = statsString.split(/(\d+)/);
            statsArray.shift();
            // console.log(statsArray); 
            let currStat;
            let currVal;
            for (let i = 0; i < statsArray.length; i++){
               
                if (i % 2 == 0) {
                    currVal = Number(statsArray[i]);
                } else {
                    currStat = statsArray[i].trim();
                    currStat = currStat.replace(/% /g, 'Percent');
                    currStat = currStat.replace(/\s/g, '');
                    currStat = currStat.replace(/MoveSpeed\w/g, 'MoveSpeed');
                    if (!stats.includes(currStat)){
                        stats.push(currStat);
                    }
                }
                if (currStat && currVal){
                    statsObj[currStat] = currVal;
                    currStat = null;
                    currVal = null;
                }
            }
            // console.log(statsObj);
        
            // if (item.description.includes('<passive>')) {
             
            //     const indexOfPassiveStart = item.description.indexOf('<passive>');
            //     const indexOfPassiveEnd = item.description.indexOf('</mainText>')
            //     passive = item.description.substr(indexOfPassiveStart + 9, indexOfPassiveEnd).replace(/<[^>]*>?/gm, '');
            //     // console.log(passive)
            // }
    
            // console.log(item.name + ': ' + passive + ' ');
            // Object.keys(item.stats).map( stat => {
            //     obj[statsMap[stat]] = item.stats[stat];
            //     if (!stats.includes(stat)) {
            //         stats.push(stat);

            //     }
            // })
            // if (item.name == "Zhonya's Hourglass") {
            //     console.log(item.description);
            // 
            let numId =  Number(id.replace(/'/g, ''));
            let itemObj = {id: numId, name: item.name, cost: item.gold.total, stats: statsObj, mythic, boots};
            // console.log(itemObj);
            // if (passive) {
            //     itemObj.passive = passive;
            // }
            filteredData.push(itemObj);
        
        //    console.log(item.name + ' ' + id + ' ')
        // if (item.name == "Goredrinker"){
        //     console.log(item.description);
        //     // console.log(item.description.replace(/<[^>]*>?/gm, ' '));
        //  }
        //    console.log((item.description).replace(/<[^>]*>?/gm, ' '))
          
          
           
        }
    })
    console.log(tags + ': tags');
    // console.log('stats: ' + stats + stats.length);
    // let sql = 'CREATE TABLE items (id serial PRIMARY KEY, name VARCHAR (100) UNIQUE NOT NULL, cost INTEGER NOT NULL, ';
    // stats.map( stat => {
    //     sql += stat + ' INTEGER DEFAULT 0, ';
    // })
    // console.log(filteredData)
    // console.log(sql)
    return filteredData;
}



const itemDataToInsert = cleanItemData(itemData);
// console.log(itemDataToInsert)

function insertData(data){
   
    data.map( item => {
        let columnString = '(id, name, cost';
        const valuesArr = [item.id, item.name, item.cost ];
        let keys = Object.keys(item.stats);

        if (keys.length == 0) {
            columnString += ') ';
        } else {
            columnString += ', ';
        }

        for (let i = 0; i < keys.length; i++) {
            valuesArr.push(item.stats[keys[i]]);
            if (i == keys.length -1) {
                columnString += `${keys[i]})`
            } else {
                columnString += `${keys[i]}, `;
            }
          
        }
        
        // console.log(columnString);
        // console.log(valuesArr);
        let query = 'INSERT INTO "items" ';
        query += columnString += ' VALUES ( ';
        for (let i = 0; i < valuesArr.length; i++) {
            if (i == valuesArr.length -1 ){
                query += `$${i + 1}) `
            }
             else {
                query += `$${i + 1}, `
             }
        }
        console.log(query);
        try {
            client.query(query, valuesArr);
        }
        catch(err){
            console.log(err);
        }
    })

}

function insertBoots(arr) {
    let bootsItems = arr.filter( item => item.boots == true );
    console.log(bootsItems);
    let query = 'INSERT INTO "boots" ("id") VALUES ($1)';
    bootsItems.map( boot => {
        let idArr = [boot.id];
        try {
            client.query(query, idArr);
        }
        catch(err){
            console.log(err);
        }

    })

}

function insertMythics(arr) {
    let mythicItems = arr.filter( item => item.mythic == true );
    console.log(mythicItems.length)
    // console.log(mythicItems);
    // let query = 'INSERT INTO "mythics" ("id") VALUES ($1)';
    // mythicItems.map( mythic => {
    //     let idArr = [mythic.id];
    //     try {
    //         client.query(query, idArr);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }

    // })
}


// insertData(itemDataToInsert);

// insertBoots(itemDataToInsert)

// insertMythics(itemDataToInsert);



// fs.writeFile(writePath, result, err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully written to file.")
//     }

// })