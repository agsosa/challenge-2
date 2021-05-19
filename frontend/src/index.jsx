import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { APIProvider } from '@lib/useAPI';
import Router from './Router';

ReactDOM.render(
  <React.StrictMode>
    <APIProvider>
      <CssBaseline />
      <Router />
    </APIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
