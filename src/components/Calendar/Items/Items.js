import React, { useState } from 'react';
import style from './items.module.scss';
import { v4 } from 'uuid';

const Items = ({ date, items }) => {
  return (
    <>
      {items.map(({ title, code, parent }) => (
        <Item title={title} code={code} date={date} />
      ))}
    </>
  );
};

const Item = ({ title, code, date }) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <ul className={style.cont} key={code}>
      {/* Item */}
      <li className={style.code}>{code}</li>
      <li className={style.item}>{title}</li>

      {/* Map date columns - fill ones with corresponding date */}
      {date.days.map(({ date, dateName }) => (
        <li key={v4()}></li>
      ))}
    </ul>
  );
};

export default Items;
