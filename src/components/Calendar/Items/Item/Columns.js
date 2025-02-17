import React, { useRef } from 'react';
import style from './item.module.scss';
import { v4 } from 'uuid';
import {
  fullDateConstructor,
  isDateBetween,
  removeSegment,
} from '../../../../utils/items';

const Columns = ({ date, groups, items, setItems, onClick }) => {
  const { year, month, days } = date;
  const removeRef = useRef(null);
  const activeBtnCss = {
    height: '0.82rem',
    minWidth: '0.82rem',
    opacity: '1',
    pointerEvents: 'initial',
  };
  const disabledBtnCss = {
    height: '0',
    minWidth: '0',
    opacity: '0',
    pointerEvents: 'none',
  };

  const handleRemoveSegment = (segmentId) => {
    const updatedItems = removeSegment(segmentId, items);

    setItems(updatedItems);
  };

  const onMouseOver = (segmentId) => {
    const ref = removeRef?.current;
    const buttonSegmentId = ref?.getAttribute('data-segment');
    const styles = ref?.style;

    if (segmentId !== buttonSegmentId) return;

    Object.keys(activeBtnCss).forEach((key) => {
      styles[key] = activeBtnCss[key];
    });
  };

  const onMouseLeave = (segmentId) => {
    const ref = removeRef?.current;
    const buttonSegmentId = ref?.getAttribute('data-segment');
    const styles = ref?.style;

    if (segmentId !== buttonSegmentId) return;

    Object.keys(disabledBtnCss).forEach((key) => {
      styles[key] = disabledBtnCss[key];
    });
  };

  const isDateBetweenFc = (segments, day) =>
    isDateBetween(year, month, day, [segments], style);

  return (
    <div className={style.rows}>
      {/* Empty Dates */}
      {groups.length < 1 ? (
        <ul className={style.days} key={v4()}>
          {days.map((day) => (
            <li onClick={() => onClick(day)} key={v4()}></li>
          ))}
        </ul>
      ) : (
        // Filled dates
        groups.map((group) => (
          <ul className={style.days} key={v4()}>
            {days.map((day) => {
              // Get all segments with current date
              const matchingSegments = group.filter((segment) =>
                isDateBetweenFc(segment, day)
              );
              // Select the segment with the closest end date
              const selectedSegment = matchingSegments.length
                ? matchingSegments.reduce((prev, current) =>
                    new Date(prev.end) < new Date(current.end) ? prev : current
                  )
                : null;
              const segmentId = selectedSegment ? selectedSegment.id : '';
              const fullDate = fullDateConstructor(year, month, day);
              const isFirstSegment = fullDate === selectedSegment?.start;
              const isLastSegment = fullDate === selectedSegment?.end;

              return (
                <li
                  key={v4()}
                  onClick={() => onClick(day, segmentId)} // Open edit form
                  id={
                    selectedSegment ? isDateBetweenFc(selectedSegment, day) : ''
                  } // Background indicator
                  className={isFirstSegment ? style.lead : ''} // First part of segments
                  style={isLastSegment ? { display: 'flex' } : {}} // Style for last part of segment
                  onMouseOver={() => onMouseOver(segmentId)} // Hover for showing delete button
                  onMouseLeave={() => onMouseLeave(segmentId)}
                >
                  {selectedSegment && isLastSegment && (
                    <button
                      className={style.removeSegment}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSegment(segmentId);
                      }}
                      ref={removeRef}
                      data-segment={segmentId}
                    >
                      ×
                    </button>
                  )}
                </li>
                // Each date
              );
            })}
          </ul>
          // End of filled dates
        ))
      )}
      {/* End of empty date */}
    </div>
  );
};

export default Columns;
