import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { APIProvider } from '@lib/useAPI';
import Router from './Router';
import { TOAST_OPTIONS } from '@lib/Config';

ReactDOM.render(
  <React.StrictMode>
    <APIProvider>
      <ConfirmProvider>
        <CssBaseline />
        <Router />
        <ToastContainer {...TOAST_OPTIONS} />
      </ConfirmProvider>
    </APIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
