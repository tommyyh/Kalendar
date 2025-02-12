import React from 'react';
import style from './header.module.scss';
import { v4 } from 'uuid';

const Header = ({ date }) => (
  <ul className={style.cont}>
    <li className={style.code}>Kód</li>
    <li className={style.item}>Položka</li>

    {date.days.map(({ date, dateName }) => (
      <li key={v4()}>
        {dateName}

        <span>{date}</span>
      </li>
    ))}
  </ul>
);

export default Header;
