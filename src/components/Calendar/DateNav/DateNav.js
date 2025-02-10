import React from 'react';
import style from './dateNav.module.scss';
import { getMonthName } from '../../../utils/calendar';

const DateNav = ({ date, setDate }) => {
  const { year, month } = date;

  const nextMonth = () => {
    // If last month -> Increase year instead
    if (month === 12) {
      setDate({ ...date, year: year + 1, month: 1 });
    } else {
      setDate({ ...date, month: month + 1 });
    }
  };

  const prevMonth = () => {
    // If first month -> Decrease year instead
    if (month === 1) {
      setDate({ ...date, year: year - 1, month: 12 });
    } else {
      setDate({ ...date, month: month - 1 });
    }
  };

  const nextYear = () => {
    if (year >= 2500) return;

    setDate({ ...date, year: year + 1 });
  };

  const prevYear = () => {
    if (year <= 1000) return;

    setDate({ ...date, year: year - 1 });
  };

  return (
    <div className={style.cont}>
      <button onClick={prevYear}>{'<<'}</button>
      <button onClick={prevMonth}>{'<'}</button>

      <div className={style.date}>
        <h6>
          {getMonthName(date.month)} {date.year}
        </h6>
      </div>

      <button onClick={nextMonth}>{'>'}</button>
      <button onClick={nextYear}>{'>>'}</button>
    </div>
  );
};

export default DateNav;
