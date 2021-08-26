import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Tables from './tables.jsx';
import NewList from './newList.jsx';

const App = () => {
  const [scrapedLinks, setLinks] = useState({});
  /*
  {tableName: {
    data: [{url, text, date}...],
    title: title,
    quantity: 10 // default
    url: search-link
  }}
  */

  useEffect( async () => {
    try {
      let results = await axios.get('/links');
      setLinks(results.data);
    } catch(err) {
      console.log(err)
    }
  }, [])

  const newTable = (obj) =>{
    axios.post('/createTable', obj)
      .then(res => {
        alert(res.data);
        try {
          scrape(obj);
        } catch(err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const scrape = async (obj) => {
    try {
      let table = obj.title.split(' ').join('').toLowerCase();
      let response = await axios.get('/scrape', {
        params: {
          table: table,
          url: obj.url
        }
      });
      setLinks({...scrapedLinks, [table] : {
        data: response.data,
        title: obj.title,
        quantity: 10, // set this default elsewhere so it doesn't always reset
        url: obj.url
      }})
    } catch(err) {
      console.log(err);
    }
  }

  const dropTable = async (table) => {
    try {
      axios.get('/drop', {
        params: {
          table: table
        }
      });
      let tempLinks = scrapedLinks;
      delete tempLinks[table];
      setLinks({...tempLinks});
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
    <h1>CRAIGSLIST AGGREGATOR</h1>
    <h2>A simple way to track the newest listings</h2>
    <h3>Text updates via Twilio COMING SOON</h3>
    <NewList newTable={(obj) => newTable(obj)}/>
    <div className="results">
    {Object.keys(scrapedLinks).map(key =>
      <Tables
      scrapedLinks={scrapedLinks[key]}
      tableName={[key]}
      scrape={(obj) => scrape(obj)}
      dropTable={(table) => dropTable(table)}/>
      )}
    </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))