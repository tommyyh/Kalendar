// Get last day of the month
const getLastDay = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Get the name of the day
const getDayName = (year, month, day) => {
  const dayIndex = new Date(year, month - 1, day).getDay();
  const daysOfWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];

  return daysOfWeek[dayIndex];
};

// Populate the days array, including next month's days if needed
export const populateDaysArray = (year, month) => {
  const lastDay = getLastDay(year, month);
  const days = [];

  // Populate array with days in the current month
  for (let x = 1; x <= lastDay; x++) {
    const dayName = getDayName(year, month, x);
    const day = {
      date: x,
      dateName: dayName,
    };

    days.push(day);
  }

  // Populate with next month's days if less than 31 days
  if (days.length < 31) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const missingDays = 31 - days.length;

    // Find the next available day in the next month to start filling the last row
    for (let i = 1; i <= missingDays; i++) {
      const dayName = getDayName(nextYear, nextMonth, i);
      const day = {
        date: i,
        dateName: dayName,
        fullDate: `${nextYear}-${nextMonth}-${i}`,
      };

      days.push(day);
    }
  }

  // Return the days of the current month and the next month's overflow days
  return days;
};

// Get month name from number
export const getMonthName = (month) => {
  const months = {
    1: 'Leden',
    2: 'Únor',
    3: 'Březen',
    4: 'Duben',
    5: 'Květen',
    6: 'Červen',
    7: 'Červenec',
    8: 'Srpen',
    9: 'Září',
    10: 'Říjen',
    11: 'Listopad',
    12: 'Prosinec',
  };

  return months[month];
};
