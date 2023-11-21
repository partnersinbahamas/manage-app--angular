import { Nav } from "src/app/types/nav";

export const navigations: Nav[] = [
  {
    id: 1,
    title: 'About',
    path: 'about',
    img: 'bx bx-home-alt-2',
  },
  {
    id: 2,
    title: 'Details',
    path: 'details',
    img: 'bx bx-color',
  },
];

export const daysOfWeek: string[] = [
  'Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday',
  'Saturday',
];


export const months: { [key: string]: string } = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
}