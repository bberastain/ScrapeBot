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