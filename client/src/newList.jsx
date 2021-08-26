import React, { useState } from 'react';

const NewList = (props) => {
  const [newList, setList] = useState({url: '', title: ''});

  const handleClick = () => {
    props.newTable(newList);
    setList({url: '', title: ''});
  }

  return(
    <div className="list-container">
      <div className="new-list">
      <h2>Create New List</h2>
        <div className="search-container">
          <div className="search-criteria">
            <label>Search URL</label>
            <input type="text" id="url" value={newList.url} onChange={(e) => setList({...newList, url: e.target.value})}></input>
          </div>
          <div className="search-criteria">
            <label>List Title</label>
            <input type="text" id="title" value={newList.title} onChange={(e) => setList({...newList, title: e.target.value})}></input>
          </div>
        </div>
        <div className="search-button-container">
          <button onClick={handleClick}>Scrape CraigsList</button>
        </div>
      </div>
    </div>
  )
}

export default NewList;