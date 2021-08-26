const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const scrape = require('./puppeteer.js');
const compression = require('compression');
const morgan = require('morgan');
const db = require('../database/index.js');

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(compression());
app.use(morgan('tiny'));

app.get('/drop', (req, res) => {
  try {
    let table = req.query.table
    db.none('DROP TABLE ' + table[0]);
    db.none('DELETE FROM searches WHERE tablename=$1', [table[0]]);
    res.send('Dropped table');
  } catch(err) {
    console.log(err);
    res.send(err);
  }
})

app.get('/links', async (req, res) => {
  try {
    let tables = await db.query(`SELECT title, tableName FROM searches`);
    let results = {};
    for (var obj of tables) {
      let links = await db.query('SELECT * FROM ' + obj.tablename);
      results = {...results, [obj.tablename]: {
        data: links,
        title: obj.title,
        quantity: 10
      }}
    }
    res.send(results);
  } catch(err) {
    res.send({});
  }
})

app.post('/createTable', (req, res) => {
  try {
    let { title, url } = req.body;
    let table= title.split(' ').join('').toLowerCase();
    db.none(`CREATE TABLE IF NOT EXISTS ` + table + `(
      id SERIAL PRIMARY KEY,
      url VARCHAR (300) UNIQUE,
      text VARCHAR (100),
      date VARCHAR (100))`)
      .then(() => {
        db.none(`INSERT INTO searches (url, title, tablename) VALUES ($1, $2, $3)`, [url, title, table])
      })
    res.send('Creating new table, just a second while I scrape up some links');
  } catch(err) {
    res.send(err);
  }
})

app.get('/scrape', async (req, res) => {
  try {
    let table = req.query.table;
    let results = await scrape(req.query.url);
    // a 304 status code means nothing was updated, implement a check to save time
    for (var i = 0; i < results.length; i++) {
      db.none('INSERT INTO ' + table + ' (url, text, date) VALUES($1, $2, $3) ON CONFLICT (url) DO NOTHING', [results[i].url, results[i].text, results[i].date])
        .then(() => {
        })
        .catch(err => {
          console.log(err);
        })
    }
    res.send(results);
  } catch(err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});