import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';

import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
    <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>
  // </React.StrictMode>
)
