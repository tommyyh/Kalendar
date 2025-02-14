// Check if date is in between start and end date
const converToDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const isDateBetween = (year, month, day, segments, style) => {
  if (!segments || segments.length === 0) return false;

  const date = fullDateConstructor(year, month, day);
  const dateString = converToDate(date);

  // Use find to get the first segment that matches the date
  const matchingSegment = segments.find((segment) => {
    if (!segment.start || !segment.end) return false;

    const startString = converToDate(segment.start);
    const endString = converToDate(segment.end);

    return dateString >= startString && dateString <= endString;
  });

  // If a matching segment is found, return its status class
  if (matchingSegment) return getStatusClass(matchingSegment.status, style);

  return false;
};

// Recursive function -> delete an item and all its descendants
export const deleteCascade = (code, items) => {
  // Find all direct children of parent
  const children = items.filter((item) => item.parent === code);

  // Recursively delete descendants
  children.forEach((child) => {
    items = deleteCascade(child.code, items);
  });

  // Remove the parent
  return items.filter((item) => item.code !== code);
};

// Toggle show true/false -> cascade
export const toggleShow = (code, items, newShowValue) => {
  // Find direct children
  const children = items.filter((item) => item.parent === code);

  // Update all descendants - recursion
  children.forEach((child) => {
    items = toggleShow(child.code, items, newShowValue);
  });

  // Update the children
  return items.map((item) =>
    item.parent === code ? { ...item, show: newShowValue } : item
  );
};

// Get classname from status
export const getStatusClass = (status, style) => {
  switch (status) {
    case 'ongoing':
      return style.activeOngoing;
    case 'unfinished':
      return style.activeUnfinished;
    case 'finished':
      return style.activeFinished;
    default:
      return style.activeOngoing;
  }
};

// Construct full date from day. If day is from next month - convert
export const fullDateConstructor = (year, month, day) => {
  const fullMonth = month >= 10 ? month : `0${month}`; // Check if month is 2 digits
  let date = `${year}-${fullMonth}-${day.date}`;

  if (day.fullDate) date = day.fullDate;

  return date;
};
