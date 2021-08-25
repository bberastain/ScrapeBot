import React, { useState } from 'react';

const NewList = (props) => {
  const [newList, setList] = useState({url: '', title: ''});

  const handleClick = () => {
    props.newTable(newList);
    setList({url: '', title: ''});
  }

  return(
    <div className="new-list">
    <h2>Create New List</h2>
    <label>Search URL</label>
    <input type="text" id="url" value={newList.url} onChange={(e) => setList({...newList, url: e.target.value})}></input>
    <label>List Title</label>
    <input type="text" id="title" value={newList.title} onChange={(e) => setList({...newList, title: e.target.value})}></input>
    <button onClick={handleClick}>Scrape CraigsList</button>
    </div>
  )
}

export default NewList;