import React, { useContext, useEffect } from 'react';
import style from './calendar.module.scss';
import { populateDaysArray } from '../../utils/calendar';
import DateNav from './DateNav/DateNav';
import Header from './Header/Header';
import Items from './Items/Items';
import { DateContext } from '../../context/DateProvide';

const Calendar = () => {
  const { date, setDate } = useContext(DateContext);

  useEffect(() => {
    setDate({
      ...date,
      days: populateDaysArray(date.year, date.month, date.day),
    });
  }, [date.year, date.month, date.day]);

  return (
    <div className={style.cont}>
      <DateNav date={date} setDate={setDate} />

      <div className={style.calendar}>
        <Header date={date} />
        <Items />
      </div>
    </div>
  );
};

export default Calendar;
