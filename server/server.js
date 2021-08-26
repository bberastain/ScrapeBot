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
    let table = 'listings'
    db.query(`DROP TABLE ${table}`);
  } catch(err) {
    console.log(err);
    res.send(err);
  }
})

app.get('/links', async (req, res) => {
  try {
    let limit = 10;
    let results = await db.query(`SELECT * FROM listings LIMIT ${limit}`);
    res.send(results);
  } catch(err) {
    res.send(err);
  }
})

app.post('/createTable', (req, res) => {
  try {
    let { title, url } = req.body;
    let tableName= title.split(' ').join('')
    db.none(`CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      url VARCHAR (300) UNIQUE,
      text VARCHAR (100),
      date VARCHAR (100))`)
      .then(() => {
        db.none(`INSERT INTO searches (url, title, tableName) VALUES ($1, $2, $3)`, [url, title, tableName])
      })
    res.send('Created new table, scraping links');
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
      db.none('INSERT INTO $1 (url, text, date) VALUES($2, $3, $4) ON CONFLICT (url) DO NOTHING', [table, results[i].url, results[i].text, results[i].date])
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