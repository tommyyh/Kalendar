import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import NewOrder from './components/NewOrder/NewOrder';
import './global.scss';

function App() {
  // Today's date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [date, setDate] = useState({
    year: currentYear,
    month: currentMonth,
    days: [],
  });
  const [items, setItems] = useState([
    {
      title: 'Zakazka cislo 1',
      code: 'A01',
      parent: '',
    },
    {
      title: 'Zakazka cislo 2',
      code: 'A02',
      parent: '',
    },
    {
      title: 'Zakazka cislo 3',
      code: 'B01',
      parent: '',
    },
  ]);

  return (
    <>
      <NewOrder date={date} items={items} setItems={setItems} />

      <Calendar
        date={date}
        setDate={setDate}
        items={items}
        setItems={setItems}
      />
    </>
  );
}

export default App;
