import { daysOfWeek } from "./variables";
import { months } from "./variables";

export function getMaxId(array: any[], startIndex = 0) {
  let maxId = startIndex;

  for (const item of array) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }

  return maxId + 1;
}


export function incrementDaysIds(array: any[]) {
  let maxId = 0;

  for (const week of array) {
    for (const day of week.days) {
      maxId = Math.max(maxId, day.id);
    }
  }

  return maxId + 1;
}

export function formatDate(inputDate: Date) {
  const date = new Date(inputDate);
    
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
    
  return `${day}.${month}.${year}`;
};

export function formatRelativeDate(inputDate: string): string {
  const currentDate = new Date();
  const dateParts = inputDate.split('.');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Месяцы в JavaScript начинаются с 0
  const year = parseInt(dateParts[2], 10);

  const inputDateTime = new Date(year, month, day).getTime();
  const currentDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();

  const timeDiff = inputDateTime - currentDateTime;
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  const currentDayOfWeek = currentDate.getDay();
  const daysUntilNextSunday = 7 - currentDayOfWeek;

  if (dayDiff === 0) {
    return 'Today';
  } else if (dayDiff === 1) {
    return 'Tomorrow';
  } else if (dayDiff === -1) {
    return 'Yesterday';
  } else if (dayDiff > 0 && dayDiff <= daysUntilNextSunday) {
    return 'This week';
  } else if (dayDiff > daysUntilNextSunday && dayDiff <= 7) {
    return 'Next week';
  } else if (dayDiff > 7 && dayDiff <= 30) {
    return 'This month';
  } else if (dayDiff > 30 && dayDiff <= 365) {
    return 'This year';
  } else if (dayDiff < 0 && dayDiff >= -daysUntilNextSunday) {
    return 'This week';
  } else if (dayDiff < -daysUntilNextSunday && dayDiff >= -7) {
    return 'Last week';
  } else if (dayDiff < -7 && dayDiff >= -30) {
    return 'Last month';
  } else if (dayDiff < -30 && dayDiff >= -365) {
    return 'Last year';
  } else {
    return 'More than a year';
  }
}

export function getCalendarDay(inputDate: string): string {
  const dateParts = inputDate.split('.');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Месяцы в JavaScript начинаются с 0
  const year = parseInt(dateParts[2], 10);

  const dayOfWeek = new Date(year, month, day).getDay();

  return daysOfWeek[dayOfWeek];
}

export function getMonth(date: string) {
  const monthNum: string = date.split('.')[1] || '01';

  return months[monthNum];
}