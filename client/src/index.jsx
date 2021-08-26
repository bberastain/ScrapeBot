import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Tables from './tables.jsx';
import NewList from './newList.jsx';

const App = () => {
  const [scrapedLinks, setLinks] = useState({});
  /*
  {tableName: {
    data: [],
    title: title,
    quantity: 10 // default
  }}
  */

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
      let table = obj.title.split(' ').join('');
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
      }})
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
    {Object.keys(scrapedLinks).map(key =>
      <Tables scrapedLinks={scrapedLinks[key]} />
    )}
    {/* <Tables
      scrape={obj => scrape(obj)}
      dropTable={dropTable}
      scrapedLinks={scrapedLinks}/> */}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))