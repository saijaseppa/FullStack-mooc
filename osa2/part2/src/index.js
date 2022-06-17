import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/*axios
  .get('http://localhost:3001/notes')
  .then(response => {
    console.log("data: ", response.data);
    const notes = response.data;
    ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />);
});
*/
ReactDOM.createRoot(document.getElementById('root')).render(<App />);