import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as sethealth from '@sethealth/react';

async function initSethealth() {
  await sethealth.initialize(
    "pub_xxxx_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
}

initSethealth();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
