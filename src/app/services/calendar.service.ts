import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorageServiceService } from './locale-storage-service.service';
import { formatDate, getMaxId } from 'src/helpers/functions';
import { ImportantsTypes, Todo } from '../types/todo';

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

  createDay(date: string) {
    const newDay = {
      id: getMaxId(this.calendar$$.getValue()),
      date: date,
      todos: [],
    };

    let updated = [...this.calendar$$.getValue(), newDay];
    this.calendar$$.next(updated);
    this.localeStorage.saveData('calendar', updated);
  }

  createWeek() {
    const calendarValue = this.calendar$$.getValue();
    let currentDate = calendarValue.length > 0 ? calendarValue[calendarValue.length - 1].date : new Date().toLocaleDateString();
    const currentDateArr = currentDate.split('.').map((item: string) => Number(item));
  
    const dayOfWeek = new Date(currentDateArr[2], currentDateArr[1] - 1, currentDateArr[0]).getDay();
  
    const startFrom = new Date(currentDateArr[2], currentDateArr[1] - 1, currentDateArr[0] - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
    const endFrom = new Date(currentDateArr[2], currentDateArr[1] - 1, currentDateArr[0] - dayOfWeek + (dayOfWeek === 0 ? 0 : 6));
  
    const formatDateString = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };
  
    const newWeek = {
      from: formatDateString(startFrom),
      to: formatDateString(endFrom),
      days: [],
    };
  
    console.log(newWeek);
  
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(currentDateArr[2], currentDateArr[1] - 1, startFrom.getDate() + i);
      this.createDay(formatDateString(nextDay));
    }
  } // not done yet
  
  createTodoByDate(date: string) {
    const copy = [...this.calendar$$.getValue()];
    const currentDayTodos = this.calendar$$
      .getValue().find(day => day.date === date).todos;

    const newTodo: Todo = {
      id: getMaxId(currentDayTodos),
      title: 'To Do',
      complete: false,
      date,
      importants: ImportantsTypes.AVARAGE,
    }

    for (const day of copy) {
      if (day.date === date) {
        day.todos = [...day.todos, newTodo];
      }
    };

    this.calendar$$.next(copy);
    this.localeStorage.saveData('calendar', copy);
  }

  updateTodoByDate(date: string, todo: Todo) {
    const copy = [...this.calendar$$.getValue()];

    for (const item of copy) {
      if (item.date === date) {
        for (let i = 0; i < item.todos.length; i++) {
          const current = item.todos[i];
          if (current.id === todo.id) {
            Object.assign(current, todo);
          }
        }
      }
    }
  
    this.calendar$$.next(copy);
    this.localeStorage.saveData('calendar', copy);
  }
}
