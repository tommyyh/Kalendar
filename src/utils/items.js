// Check if date is in between start and end date
const converToDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const isDateBetween = (year, month, day, start, end) => {
  if (!start || !end) return false;

  // Check if filled dates from next month based of of fullDate attr
  const date = fullDateConstructor(year, month, day);

  // Convert dates to yyyy-mm-dd
  const dateString = converToDate(date);
  const startString = converToDate(start);
  const endString = converToDate(end);

  // Check if the date is between the start and end dates (inclusive)
  return dateString >= startString && dateString <= endString;
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
  let date = `${year}-0${month}-${day.date}`;

  if (day.fullDate) date = day.fullDate;

  return date;
};
