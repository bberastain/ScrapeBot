import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const thing = async () => {
    try {
      const response = await axios.get('/things');
      console.log(response.data);
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <>
    <h1>THIS MY APP</h1>
    <div>with more stuff</div>
    <button onClick={thing}>Click</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))