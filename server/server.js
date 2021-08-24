const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const scrape = require('./puppeteer');
const compression = require('compression');
const morgan = require('morgan');

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(compression());
app.use(morgan('tiny'));

app.get('/scrape', async (req, res) => {
  try {
    const results = await scrape();
    // a 304 status code means nothing was updated, save time by not sending those results
    res.send(results);
  } catch(err) {
    console.log(err);
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});