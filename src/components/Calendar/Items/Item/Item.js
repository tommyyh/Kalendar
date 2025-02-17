import React, { useContext, useEffect, useState } from 'react';
import style from './item.module.scss';
import {
  fullDateConstructor,
  groupSegments,
  toggleShow,
} from '../../../../utils/items';
import { DateContext } from '../../../../context/DateProvide';
import { EditCodeContext } from '../../../../context/EditCodeProvider';
import { FormOpenContext } from '../../../../context/FormOpenProvider';
import { getDayName } from '../../../../utils/calendar';
import Columns from './Columns';

const Item = ({ item, items, setItems }) => {
  const [groups, setGroups] = useState([]);
  const { editCode, setEditCode } = useContext(EditCodeContext);
  const { setFormOpen } = useContext(FormOpenContext);
  const { date } = useContext(DateContext);
  const { title, code, parent, segments, show } = item;
  const { year, month, day: today } = date;
  const firstChild = items.find((x) => x.parent === code);
  const expandedIndicator = firstChild?.show || (show && parent);
  const isParent = items.filter((item) => item.parent === code).length >= 1;
  const todaysDate = {
    date: today,
    dateName: getDayName(year, month, today),
  };

  const onClick = (day, segmentId) => {
    const selectedDate = fullDateConstructor(year, month, day);

    // Scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    setFormOpen(false);
    setEditCode({ code, selectedDate, segmentId });
  };

  useEffect(() => {
    const segmentGroups = groupSegments(segments);

    setGroups(segmentGroups);
  }, [segments]);

  const showChildren = () => {
    const updatedItems = toggleShow(code, items, !firstChild?.show);

    setItems(updatedItems);
  };

  return (
    show && (
      <ul
        className={
          groups.length > 0 ? `${style.cont} ${style.expanded}` : style.cont
        }
        id={editCode.code === code ? style.codeSelected : ''}
        key={code}
      >
        {/* Item */}
        <li
          className={
            expandedIndicator ? `${style.code} ${style.active}` : style.code
          }
          onClick={() => onClick(todaysDate)}
          id={!parent && items[0] !== item && isParent ? style.first : ''} // End of tree connecting border style
        >
          {code}
        </li>
        <li
          className={
            isParent ? `${style.item} ${style.parentItem}` : style.item
          }
          id={groups.length > 0 ? style.parentExpanded : ''}
          onClick={() => onClick(todaysDate)}
        >
          {isParent && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                showChildren();
              }}
            >
              {firstChild?.show ? '-' : '+'}
            </button>
          )}{' '}
          {title}
        </li>

        <Columns
          date={date}
          groups={groups}
          items={items}
          setItems={setItems}
          onClick={onClick}
        />
      </ul>
    )
  );
};

export default Item;
