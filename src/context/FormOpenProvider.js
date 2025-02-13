import React, { createContext, useState } from 'react';

export const FormOpenContext = createContext(null);
export const FormOpenProvider = ({ children }) => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <FormOpenContext.Provider value={{ formOpen, setFormOpen }}>
      {children}
    </FormOpenContext.Provider>
  );
};
