var fs = require('fs')
const db = require('./database');

let oldPath = "C:\\Users\\nyfra\\OneDrive\\Desktop\\Riot Assets\\img\\champion\\tiles\\"

let newPath = 'C:\\Users\\nyfra\\OneDrive\\Desktop\\League\\frontend\\src\\assets\\champions\\'

let oldItemPath = "C:\\Users\\nyfra\\OneDrive\\Desktop\\Riot Assets\\13.18.1\\img\\item\\"
let newItemPath = 'C:\\Users\\nyfra\\OneDrive\\Desktop\\League\\frontend\\public\\items\\'

async function getItemIds() { //this function moves the items from local folder to project folder
    const itemIds = [];
    await db.query('SELECT id FROM items').then(res => {
        res.rows.map( obj => {
            const id = obj.id;
            fs.rename(oldItemPath + id + '.png', newItemPath + id + '.png', function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!')
            })
        })
    })
}

// getItemIds();
// "C:\Users\nyfra\OneDrive\Desktop\Riot Assets\13.18.1\img\item\1001.png"

async function getChampionNames() {
    const championNames = [] 
    await db.query('SELECT name FROM champions').then( res => {
        res.rows.map( champ => {
            const name = champ.name;
            name.replaceAll(' ', '');
            fs.rename(oldPath + name + '_0.jpg', newPath + name + '.jpg', function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!')
              })
        })
    })
    await db.end();
    return championNames;
}
// const names = getChampionNames();
// console.log(names)

function getFileNames () {
    fs.readdir(newPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            if (file.includes('champions')) {
                const newFileExt = file.replaceAll('champions', '');
                const prevLoc = newPath + file;
                const newLoc = newPath + newFileExt;
                // console.log(prevLoc + ': ' + newLoc);
                fs.rename(prevLoc, newLoc, function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!')
                  })
            }
        });
    });
}

// getFileNames();