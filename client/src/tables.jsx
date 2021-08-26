import React from 'react';

const Tables = (props) => {
  return (
    <div className="scrape-results">
      <h3>{props.scrapedLinks.title}</h3>
      <ul>
      {[...new Array(props.scrapedLinks.quantity)].map((i, index) =>
      <li><a href={props.scrapedLinks.data[index].url}>{props.scrapedLinks.data[index].text}</a> - posted {props.scrapedLinks.data[index].date}</li>
      )}
      </ul>
      <button onClick={() => props.scrape({title: props.scrapedLinks.title, url: props.scrapedLinks.url})}>Refresh</button>
      <button onClick={() => props.dropTable(props.tableName)}>Delete</button>
    </div>
  )
}


export default Tables;