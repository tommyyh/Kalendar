import React, { useContext, useEffect, useState } from 'react';
import style from './item.module.scss';
import { v4 } from 'uuid';
import {
  fullDateConstructor,
  groupSegments,
  isDateBetween,
  toggleShow,
} from '../../../../utils/items';
import { DateContext } from '../../../../context/DateProvide';
import { EditCodeContext } from '../../../../context/EditCodeProvider';
import { FormOpenContext } from '../../../../context/FormOpenProvider';
import { getDayName } from '../../../../utils/calendar';

const Item = ({ item, items, setItems }) => {
  const [groups, setGroups] = useState([]);
  const { setEditCode } = useContext(EditCodeContext);
  const { setFormOpen } = useContext(FormOpenContext);
  const { date } = useContext(DateContext);
  const { title, code, parent, segments, show } = item;
  const { year, month, day: today, days } = date;
  const firstChild = items.find((x) => x.parent === code);
  const expandedIndicator = firstChild?.show || (show && parent);
  const isParent = items.filter((item) => item.parent === code).length >= 1;
  const todaysDate = {
    date: today,
    dateName: getDayName(year, month, today),
  };

  const onClick = (day, segmentId) => {
    const selectedDate = fullDateConstructor(year, month, day);

    setFormOpen(false);
    setEditCode({ code, selectedDate, segmentId });
  };

  const handleRemoveSegment = (segmentId) => {
    console.log(`Removing segment with ID: ${segmentId}`);
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
        key={code}
      >
        {/* Item */}
        <li
          className={
            expandedIndicator ? `${style.code} ${style.active}` : style.code
          }
          onClick={() => onClick(todaysDate)}
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
            <button onClick={showChildren}>
              {firstChild?.show ? '-' : '+'}
            </button>
          )}{' '}
          {title}
        </li>

        {/* Map date columns - fill ones with corresponding date */}
        <div className={style.rows}>
          {groups.length < 1 ? (
            <ul className={style.days} key={v4()}>
              {days.map((day) => (
                <li onClick={() => onClick(day)} key={v4()}></li>
              ))}
            </ul>
          ) : (
            groups.map((group, groupIndex) => (
              <ul className={style.days} key={v4()}>
                {days.map((day, dayIndex) => {
                  // Filter all segments that include this `day`
                  const matchingSegments = group.filter((segment) =>
                    isDateBetween(year, month, day, [segment], style)
                  );

                  // Select the segment with the closest `end` date
                  const selectedSegment = matchingSegments.length
                    ? matchingSegments.reduce((prev, curr) =>
                        new Date(prev.end) < new Date(curr.end) ? prev : curr
                      )
                    : null;

                  const segmentId = selectedSegment ? selectedSegment.id : '';

                  return (
                    <li
                      onClick={() => onClick(day, segmentId)}
                      id={
                        selectedSegment
                          ? isDateBetween(
                              year,
                              month,
                              day,
                              [selectedSegment],
                              style
                            )
                          : ''
                      }
                      key={v4()}
                    >
                      {selectedSegment && (
                        <button
                          className={style.removeSegment}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSegment(segmentId);
                          }}
                        >
                          ×
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            ))
          )}
        </div>
      </ul>
    )
  );
};

export default Item;
