import React from 'react';

const Tables = (props) => {
  return (
    <div className="scrape-results">
      <ul>
      {props.scrapedLinks.map((item, index) => <li><a href={item.link}>{item.text}</a> - posted {item.date}</li>)}
      </ul>
      <button onClick={() => props.scrape()}>Scrape</button>
      <button onClick={() => props.dropTable()}>Delete</button>
    </div>
  )
}


export default Tables;