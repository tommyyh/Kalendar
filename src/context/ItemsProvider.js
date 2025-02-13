import React, { createContext, useState } from 'react';

export const ItemsContext = createContext(null);
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([
    {
      title: 'Zakazka cislo 1',
      code: 'A01',
      parent: '',
      show: true,
    },
    {
      title: 'Zakazka cislo 2',
      code: 'A02',
      parent: '',
      show: true,
    },
    {
      title: 'Zakazka cislo 3',
      code: 'B01',
      parent: '',
      show: true,
    },
  ]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
