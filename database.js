require('dotenv').config();

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

  const query = (text, params, callback) => {
    return client.query(text, params, callback);
  }

  const end = () => {
    return client.end();
  }
  module.exports = {
    query, end
  }
