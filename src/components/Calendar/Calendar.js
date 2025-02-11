import React, { useEffect } from 'react';
import style from './calendar.module.scss';
import { populateDaysArray } from '../../utils/calendar';
import DateNav from './DateNav/DateNav';
import Header from './Header/Header';
import Items from './Items/Items';

const Calendar = ({
  date,
  setDate,
  items,
  setItems,
  setEditCode,
  setFormOpen,
  editCode,
}) => {
  useEffect(() => {
    setDate({ ...date, days: populateDaysArray(date.year, date.month) });
  }, [date.year, date.month]);

  return (
    <div className={style.cont}>
      <DateNav date={date} setDate={setDate} />

      <Header date={date} />
      <Items
        date={date}
        items={items}
        setEditCode={setEditCode}
        setFormOpen={setFormOpen}
        editCode={editCode}
      />
    </div>
  );
};

export default Calendar;
