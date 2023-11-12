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
  
    if (dayDiff === 0) {
      return 'Today';
    } else if (dayDiff === 1) {
      return 'Tomorrow';
    } else if (dayDiff === -1) {
      return 'Yesterday';
    } else {
      return inputDate;
    }
  }

  export function getCalendarDay(inputDate: string): string {
    const dateParts = inputDate.split('.');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Месяцы в JavaScript начинаются с 0
    const year = parseInt(dateParts[2], 10);
  
    const dayOfWeek = new Date(year, month, day).getDay();
    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    return daysOfWeek[dayOfWeek];
  }