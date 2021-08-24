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
    <div>There is a hardcoded craigslist link you can scrape from, but I'll eventually let you upload one.<br></br>
    (Scrape is a little slow so give it 2 secs)</div>
    <ul>
    {scrapedLinks.map((item, index) => <li><a href={item.link}>{item.text}</a> - posted {item.time}</li>)}
    </ul>
    <button onClick={scrape}>Scrape</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))