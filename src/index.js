import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { DateProvider } from './context/DateProvide';
import { ItemsProvider } from './context/ItemsProvider';
import { EditCodeProvider } from './context/EditCodeProvider';
import { FormOpenProvider } from './context/FormOpenProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DateProvider>
      <ItemsProvider>
        <EditCodeProvider>
          <FormOpenProvider>
            <App />
          </FormOpenProvider>
        </EditCodeProvider>
      </ItemsProvider>
    </DateProvider>
  </React.StrictMode>
);
