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

app.get('/links', async (req, res) => {
  try {
    let limit = 10;
    let results = await db.query(`SELECT * FROM listings LIMIT ${limit}`);
    res.send(results);
  } catch(err) {
    res.send(err);
  }
})

app.get('/drop', (req, res) => {
  try {
    let table = 'listings'
    db.query(`DROP TABLE ${table}`);
  } catch(err) {
    console.log(err);
    res.send(err);
  }
})

app.get('/scrape', async (req, res) => {
  try {
    let results = await scrape();
    // a 304 status code means nothing was updated, implement a check to save time
    for (var i = 0; i < results.length; i++) {
      db.none('INSERT INTO listings(link, text, date) VALUES($1, $2, $3) ON CONFLICT (link) DO NOTHING', [results[i].link, results[i].text, results[i].date, results[i].link])
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