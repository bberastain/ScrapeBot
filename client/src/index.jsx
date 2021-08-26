import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {

  useEffect(() => {
  }, [])

  const scrape = async (obj) => {
    let response = await axios.get('/scrape', {
      params: {
        table: table,
        url: obj.url
      }
    });
  }

  return (
    <>
    <h1>PUPPETEER</h1>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))