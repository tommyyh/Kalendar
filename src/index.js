import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { DateProvider } from './components/context/DateProvide';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DateProvider>
      <App />
    </DateProvider>
  </React.StrictMode>
);
