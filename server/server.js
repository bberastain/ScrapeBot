const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());

app.get('/things', async (req, res) => {
  try {
    const response = await axios.get('https://sfbay.craigslist.org/');
    // debugger;
    res.send(response.data);
  } catch(err) {
    console.log(err);
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});