import React, { createContext, useState } from 'react';
import { currentMonth, currentYear } from '../../utils/calendar';

export const DateContext = createContext(null);
export const DateProvider = ({ children }) => {
  const [date, setDate] = useState({
    year: currentYear,
    month: currentMonth,
    days: [],
  });

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};
