import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Tables from './tables.jsx';
import NewList from './newList.jsx';

const App = () => {
  const [scrapedLinks, setLinks] = useState([]);

  useEffect( async () => {
    try {
      let links = await axios.get('/links');
      if (Array.isArray(links.data)) {
        setLinks(links.data)
      }
    } catch(err) {
      console.log(err);
    }
  }, [])

  const newTable = (obj) =>{
    axios.post('/createTable', obj)
      .then(() => {
        // scrape data
        // render new table
      })
      .catch(err => {
        console.log(err);
      });
  }

  const scrape = async () => {
    try {
      let response = await axios.get('/scrape');
      let shortenedResponse = [];
      for (var i = 0; i < 10; i++) {
        shortenedResponse.push(response.data[i]);
      }
      setLinks(shortenedResponse);
    } catch(err) {
      console.log(err);
    }
  }

  const dropTable = async () => {
    try {
      axios.get('/drop');
      setLinks([]);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
    <h1>CRAIGSLIST AGGREGATOR</h1>
    <div>A simple way to track the newest listings</div>
    <NewList newTable={(obj) => newTable(obj)}/>
    <Tables
      scrape={scrape}
      dropTable={dropTable}
      scrapedLinks={scrapedLinks}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))