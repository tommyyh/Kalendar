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
