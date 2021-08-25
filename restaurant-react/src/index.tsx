import './index.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import AppProvider from 'providers/app.provider';
import AuthProvider from 'providers/auth.provider';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme();

ReactDOM.render(
  <BrowserRouter basename="/">
    <React.StrictMode>
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            <AppProvider>
              <App />
            </AppProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
