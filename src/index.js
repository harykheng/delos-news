import React from 'react';
import { render } from 'react-dom';
import './index.css';
import routes from './routes';
import Layout from './routes/Layout';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <React.StrictMode>
    <Layout routes={routes}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
