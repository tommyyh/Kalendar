import React, { useContext, useEffect } from 'react';
import style from './calendar.module.scss';
import { populateDaysArray } from '../../utils/calendar';
import DateNav from './DateNav/DateNav';
import Header from './Header/Header';
import Items from './Items/Items';
import { DateContext } from '../context/DateProvide';

const Calendar = ({ items, setItems, setEditCode, setFormOpen, editCode }) => {
  const { date, setDate } = useContext(DateContext);

  useEffect(() => {
    setDate({ ...date, days: populateDaysArray(date.year, date.month) });
  }, [date.year, date.month]);

  return (
    <div className={style.cont}>
      <DateNav date={date} setDate={setDate} />

      <Header date={date} />
      <Items
        items={items}
        setEditCode={setEditCode}
        setFormOpen={setFormOpen}
        editCode={editCode}
        setItems={setItems}
      />
    </div>
  );
};

export default Calendar;
