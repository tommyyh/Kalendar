import React, { createContext, useState } from 'react';

export const EditCodeContext = createContext(null);
export const EditCodeProvider = ({ children }) => {
  const [editCode, setEditCode] = useState({
    code: '',
    selectedDate: '',
    segmentId: '',
  });

  return (
    <EditCodeContext.Provider value={{ editCode, setEditCode }}>
      {children}
    </EditCodeContext.Provider>
  );
};
