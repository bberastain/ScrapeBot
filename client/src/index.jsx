import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const [scrapedLinks, setLinks] = useState([]);

  useEffect( async () => {
    try {
      let links = await axios.get('/links');
      setLinks(links.data);
    } catch(err) {
      console.log(err);
    }
  }, [])

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
  return (
    <>
    <h1>CraigsList Aggregator</h1>
    <div>There is a hardcoded craigslist link you can scrape from, but I'll eventually let you upload one.<br></br>
    (Scrape is a little slow so give it 2 secs)</div>
    <div className="scrape-results">
      <ul>
      {scrapedLinks.map((item, index) => <li><a href={item.link}>{item.text}</a> - posted {item.date}</li>)}
      </ul>
      <button onClick={scrape}>Scrape</button>
    </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))