import React from 'react';
import style from './dateNav.module.scss';
import { setNewDate, getMonthName } from '../../../utils/calendar';

const DateNav = ({ date, setDate }) => {
  const { year, month, day } = date;

  const onClick = (numberOfDays) => {
    setNewDate(year, month, day, numberOfDays, date, setDate);
  };

  return (
    <div className={style.cont}>
      <button onClick={() => onClick(-14)}>{'<<'}</button>
      <button onClick={() => onClick(-7)}>{'<'}</button>

      <div className={style.date}>
        <h6>
          {getMonthName(date.month)} {date.year}
        </h6>
      </div>

      <button onClick={() => onClick(7)}>{'>'}</button>
      <button onClick={() => onClick(14)}>{'>>'}</button>
    </div>
  );
};

export default DateNav;
