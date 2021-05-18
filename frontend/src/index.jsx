import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
