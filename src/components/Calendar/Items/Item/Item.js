import React, { useContext } from 'react';
import style from './item.module.scss';
import { v4 } from 'uuid';
import {
  fullDateConstructor,
  getStatusClass,
  isDateBetween,
  toggleShow,
} from '../../../../utils/items';
import { DateContext } from '../../../../context/DateProvide';
import { EditCodeContext } from '../../../../context/EditCodeProvider';
import { FormOpenContext } from '../../../../context/FormOpenProvider';

const Item = ({ item, items, setItems }) => {
  const { setEditCode } = useContext(EditCodeContext);
  const { setFormOpen } = useContext(FormOpenContext);
  const { date } = useContext(DateContext);
  const { title, code, parent, start, end, status, show } = item;
  const { year, month, days } = date;
  const firstChild = items.find((x) => x.parent === code);
  const expandedIndicator = firstChild?.show || (show && parent);
  const isParent = items.filter((item) => item.parent === code).length >= 1;
  const statusClass = getStatusClass(status, style);

  const onClick = (day) => {
    const selectedDate = fullDateConstructor(year, month, day);

    setFormOpen(false);
    setEditCode({ code, selectedDate });
  };

  const showChildren = () => {
    const updatedItems = toggleShow(code, items, !firstChild?.show);

    setItems(updatedItems);
  };

  return (
    show && (
      <ul className={style.cont} key={code}>
        {/* Item */}
        <li
          className={
            expandedIndicator ? `${style.code} ${style.active}` : style.code
          }
        >
          {code}
        </li>
        <li
          className={
            isParent ? `${style.item} ${style.parentItem}` : style.item
          }
        >
          {isParent && (
            <button onClick={showChildren}>
              {firstChild?.show ? '-' : '+'}
            </button>
          )}{' '}
          {title}
        </li>

        {/* Map date columns - fill ones with corresponding date */}
        {days.map((day) => (
          <li
            key={v4()}
            onClick={() => onClick(day)}
            id={isDateBetween(year, month, day, start, end) ? statusClass : ''}
          ></li>
        ))}
      </ul>
    )
  );
};

export default Item;
