const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const scrape = require('./puppeteer')

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());

app.get('/scrape', async (req, res) => {
  try {
    const results = await scrape();
    res.send(results);
  } catch(err) {
    console.log(err);
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});