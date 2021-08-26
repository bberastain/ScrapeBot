import React from 'react';

const Tables = (props) => {
  return (
    <div className="scrape-results">
      <h2 className="result-title">{props.scrapedLinks.title}</h2>
      <ul>
      {[...new Array(props.scrapedLinks.quantity)].map((i, index) =>
      <li><a href={props.scrapedLinks.data[index].url}>{props.scrapedLinks.data[index].text}</a> - posted {props.scrapedLinks.data[index].date}</li>
      )}
      </ul>
      <div className="result-buttons">
        <button onClick={() => props.scrape({title: props.scrapedLinks.title, url: props.scrapedLinks.url})}>REFRESH</button>
        <button onClick={() => props.dropTable(props.tableName)}>DELETE</button>
      </div>
    </div>
  )
}


export default Tables;