import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop ';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { InterestedProvider } from './context/InterestedContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <InterestedProvider>
      <ScrollToTop />
      <App />
      <ToastContainer autoClose={2000} className="toast-position" />
    </InterestedProvider>
  </BrowserRouter>
);