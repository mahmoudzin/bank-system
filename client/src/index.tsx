import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import { ColorModeContextProvider } from './Theme/Theme';
import store from './Store/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider>
        <ColorModeContextProvider>
         <Provider store={store}>
          <App />
         </Provider>
        </ColorModeContextProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

