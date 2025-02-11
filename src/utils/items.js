// Check if date is in between start and end date
const converToDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const isDateBetween = (date, start, end) => {
  // Convert dates to yyyy-mm-dd
  const dateString = converToDate(date);
  const startString = converToDate(start);
  const endString = converToDate(end);

  // Check if the date is between the start and end dates (inclusive)
  return dateString >= startString && dateString <= endString;
};

// Recursive function -> delete an item and all its descendants
export const deleteCascade = (code, items) => {
  // Find all direct children of the given code
  const children = items.filter((item) => item.parent === code);

  // Recursively delete descendants
  children.forEach((child) => {
    items = deleteCascade(child.code, items);
  });

  // Remove the parent
  return items.filter((item) => item.code !== code);
};
