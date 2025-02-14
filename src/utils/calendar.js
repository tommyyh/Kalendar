// Get the name of the day
export const getDayName = (year, month, day) => {
  const dayIndex = new Date(year, month - 1, day).getDay();
  const daysOfWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];

  return daysOfWeek[dayIndex];
};

// Get the amount of days in a date
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// Populate the days array, including next month's days if needed
export const populateDaysArray = (year, month, day) => {
  const days = [];
  const daysInMonth = getDaysInMonth(year, month);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  let date; // Each day

  for (let x = 0; x < 14; x++) {
    const dateNum = parseInt(day) + x;

    if (dateNum > daysInMonth) {
      const newDate = dateNum - daysInMonth;
      const fullNextMonth = nextMonth >= 10 ? nextMonth : `0${nextMonth}`; // If month 1 digit - append 0
      const fullNewDate = newDate >= 10 ? newDate : `0${newDate}`; // If month 1 digit - append 0

      date = {
        date: newDate,
        dateName: getDayName(nextYear, nextMonth, fullNewDate),
        fullDate: `${nextYear}-${fullNextMonth}-${fullNewDate}`,
      };
    } else {
      date = {
        date: dateNum,
        dateName: getDayName(year, month, dateNum),
      };
    }
    days.push(date);
  }

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

// Today's date
const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth() + 1;
export const currentDay = currentDate.getDate();

// Navigate calendar
export const setNewDate = (
  year,
  month,
  day,
  numberOfDays,
  prevDate,
  setDate
) => {
  const date = new Date(year, month - 1, day);

  // Get date from x amount of days from today
  date.setDate(date.getDate() + Number(numberOfDays)); // If numberOfDays eg. -10 -> subtract instead of add

  const newYear = date.getFullYear();
  const newMonth = date.getMonth() + 1;
  const newDay = date.getDate();

  setDate({ ...prevDate, year: newYear, month: newMonth, day: newDay });
};
