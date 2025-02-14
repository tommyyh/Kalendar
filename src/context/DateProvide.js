import React, { createContext, useState } from 'react';
import { currentDay, currentMonth, currentYear } from '../utils/calendar';

export const DateContext = createContext(null);
export const DateProvider = ({ children }) => {
  const [date, setDate] = useState({
    year: currentYear,
    month: currentMonth,
    day: currentDay,
    days: [],
  });

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};
