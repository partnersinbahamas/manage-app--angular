import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorageServiceService } from './locale-storage-service.service';
import { formatDate, getMaxId } from 'src/helpers/functions';
import { Day } from '../types/day';
import { Week } from '../types/week';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private calendar$$ = new BehaviorSubject<any[]>([]);
  calendar$ = this.calendar$$.asObservable();

  constructor(
    private localeStorage: LocaleStorageServiceService,
  ) {
    this.calendar$$.next(this.localeStorage.getData('calendar') || []);
  }

  calendar = this.calendar$$.getValue();

  createDay(date: string, array: any[]) {
    const newDay = {
      id: getMaxId(array),
      date: date,
      todos: [],
    };

    // let updated = [...this.calendar$$.getValue(), newDay];
    // this.calendar$$.next(updated);
    // this.localeStorage.saveData('calendar', updated);

    return newDay;
  }

  createWeek() {
    const calendar = this.calendar$$.getValue();
    const lastWeekDays = calendar.length > 0 ? calendar[calendar.length - 1].days : [];

    console.log(lastWeekDays);

    const currentDate: string = calendar.length > 0
      ? lastWeekDays[lastWeekDays.length - 1].date
      : formatDate(new Date());
  
    const preparedDate: string = currentDate.split('.').reverse().join('-');
    const newDate: Date = new Date(preparedDate);
  
    const nextDay: Date = new Date(newDate);
    nextDay.setDate(newDate.getDate() + 1);

    const startOfWeek: Date = new Date(newDate);
    startOfWeek.setDate(newDate.getDate() - newDate.getDay());

    const newDays: Day[] = [];
    const newWeekId: number = getMaxId(this.calendar$$.getValue());

    for (let i = 0; i < 7; i++) {
      const formattedDay = formatDate(new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)));
      
      const newDay = this.createDay(formattedDay, newDays);
      newDays.push(newDay);
    };

    const newWeek: Week = {
      id: newWeekId,
      startFrom: newDays[0].date,
      endTo: newDays[newDays.length - 1].date,
      days: newDays,
    }

    console.log(newWeek);

    this.calendar$$.next([...calendar, newWeek]);
    this.localeStorage.saveData('calendar', [...calendar, newWeek]);
  }
  
  
  // createTodoByDate(date: string) {
  //   const copy = [...this.calendar$$.getValue()];
  //   const currentDayTodos = this.calendar$$
  //     .getValue().find(day => day.date === date).todos;

  //   const newTodo: Todo = {
  //     id: getMaxId(currentDayTodos),
  //     title: 'To Do',
  //     complete: false,
  //     date,
  //     importants: ImportantsTypes.AVARAGE,
  //   }

  //   for (const day of copy) {
  //     if (day.date === date) {
  //       day.todos = [...day.todos, newTodo];
  //     }
  //   };

  //   this.calendar$$.next(copy);
  //   this.localeStorage.saveData('calendar', copy);
  // }

  // updateTodoByDate(date: string, todo: Todo) {
  //   const copy = [...this.calendar$$.getValue()];

  //   for (const item of copy) {
  //     if (item.date === date) {
  //       for (let i = 0; i < item.todos.length; i++) {
  //         const current = item.todos[i];
  //         if (current.id === todo.id) {
  //           Object.assign(current, todo);
  //         }
  //       }
  //     }
  //   }
  
  //   this.calendar$$.next(copy);
  //   this.localeStorage.saveData('calendar', copy);
  // }
}
