import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App'; // Make sure this path is correct and matches your file name
import store  from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
