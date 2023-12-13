import { Important } from "src/app/types/important";
import { Nav } from "src/app/types/nav";
import { ImportantsTypes } from "src/app/types/todo";

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

export const importants: Important[] = [
  {
    id: 1,
    value: ImportantsTypes.WEAK,
    label: 'Weak',
    formGroup: null,
  },
  {
    id: 2,
    value: ImportantsTypes.AVARAGE,
    label: 'Avarage',
    formGroup: null,
  },
  {
    id: 3,
    value: ImportantsTypes.STRONG,
    label: 'Strong',
    formGroup: null,
  }
]


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