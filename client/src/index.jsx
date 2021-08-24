import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const scrape = async () => {
    try {
      const response = await axios.get('/scrape');
      console.log(response.data);
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <>
    <h1>Web Scraper</h1>
    <div>I'll eventually let you enter the craigslist URL</div>
    <button onClick={scrape}>Scrape</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))