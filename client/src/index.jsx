import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const [scrapedLinks, setLinks] = useState([]);
  const scrape = async () => {
    try {
      const response = await axios.get('/scrape');
      const shortenedResponse = [];
      for (var i = 0; i < 10; i++) {
        shortenedResponse.push(response.data[i]);
      }
      setLinks(shortenedResponse);
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <>
    <h1>Web Scraper</h1>
    <div>I'll eventually let you enter the craigslist URL</div>
    <ul>
    {scrapedLinks.map((i, index) => <li><a href={i}>Link # {index}</a></li>)}
    </ul>
    <button onClick={scrape}>Scrape</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))