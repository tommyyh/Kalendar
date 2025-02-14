import React from 'react';
import style from './header.module.scss';
import { v4 } from 'uuid';
import { isDateToday } from '../../../utils/calendar';

const Header = ({ date }) => {
  return (
    <ul className={style.cont}>
      <li className={style.code}>Kód</li>
      <li className={style.item}>Položka</li>

      {date.days.map((day) => {
        const today = isDateToday(day?.fullDate, day.date);

        return (
          <li key={v4()} id={today ? style.today : ''}>
            {day.dateName}

            <span>{day.date}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Header;
