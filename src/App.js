import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import NewOrder from './components/NewOrder/NewOrder';
import './global.scss';
import EditItem from './components/Calendar/EditItem/EditItem';
import { currentMonth, currentYear } from './utils/calendar';

export const App = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [editCode, setEditCode] = useState('');
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
    <>
      <NewOrder
        date={date}
        items={items}
        setItems={setItems}
        editCode={editCode}
        setEditCode={setEditCode}
        formOpen={formOpen}
        setFormOpen={setFormOpen}
      />
      <EditItem
        date={date}
        items={items}
        setItems={setItems}
        editCode={editCode}
        setEditCode={setEditCode}
      />

      <Calendar
        date={date}
        setDate={setDate}
        items={items}
        setItems={setItems}
        setEditCode={setEditCode}
        setFormOpen={setFormOpen}
        editCode={editCode}
      />
    </>
  );
};
