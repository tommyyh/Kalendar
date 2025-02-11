import React from 'react';
import style from './items.module.scss';
import { v4 } from 'uuid';
import {
  isDateBetween as isDateBetweenFc,
  toggleShow,
} from '../../../utils/items';

const Items = ({
  date,
  items,
  setEditCode,
  setFormOpen,
  editCode,
  setItems,
}) => {
  return (
    <>
      {items.map((item) => (
        <Item
          item={item}
          date={date}
          setEditCode={setEditCode}
          setFormOpen={setFormOpen}
          editCode={editCode}
          items={items}
          setItems={setItems}
          key={item.code}
        />
      ))}
    </>
  );
};

const Item = ({
  item,
  date,
  setEditCode,
  setFormOpen,
  editCode,
  items,
  setItems,
}) => {
  const { title, code, parent, start, end, status, show } = item;
  const { year, month, days } = date;
  const firstChild = items.find((x) => x.parent === code);
  const expandedIndicator = firstChild?.show || (show && parent);
  let statusClass;
  const isParent = items.filter((item) => item.parent === code).length >= 1;
  const randomNum = Math.floor(Math.random() * 100) + 1;

  // Allocate class depending on status
  switch (status) {
    case 'ongoing':
      statusClass = style.activeOngoing;
      break;
    case 'unfinished':
      statusClass = style.activeUnfinished;
      break;
    case 'finished':
      statusClass = style.activeFinished;
      break;
    default:
      statusClass = style.activeOngoing;
      break;
  }

  const onClick = () => {
    setFormOpen(false);
    setEditCode('');

    // Change item -> Animation
    if (editCode) {
      setTimeout(() => {
        setEditCode(code);
      }, 250);
    } else {
      setEditCode(code);
    }
  };

  // Check if date is in between 2 dates
  const isDateBetween = (day) => {
    if (!start || !end) return false;

    // Check if filled dates from next month based of of fullDate attr
    let dateToCompare = `${year}-0${month}-${day.date}`;
    if (day.fullDate) dateToCompare = day.fullDate;

    return isDateBetweenFc(dateToCompare, start, end);
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
          onClick={onClick}
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
            onClick={onClick}
            id={isDateBetween(day) ? statusClass : ''}
          ></li>
        ))}
      </ul>
    )
  );
};

export default Items;
