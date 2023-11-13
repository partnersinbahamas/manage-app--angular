import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorageServiceService } from './locale-storage-service.service';
import { formatDate } from 'src/helpers/functions';
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

  createDay() {
    const newDay = {
      id: 1,
      date: formatDate(new Date()),
      todos: [],
    };

    let updated = [...this.calendar$$.getValue(), newDay];
    this.calendar$$.next(updated);
    this.localeStorage.saveData('calendar', updated);
  }


  createTodoByDate(date: string) {
    const copy = [...this.calendar$$.getValue()];

    const newTodo: Todo = {
      id: 1,
      title: 'newTodo',
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
          if (item.todos[i].id === todo.id) {
            // Обновляем свойства существующего объекта     /// ?
            Object.assign(item.todos[i], todo);
            console.log(item.todos[i]);
          }
        }
      }
    }
  
    this.calendar$$.next(copy);
    this.localeStorage.saveData('calendar', copy);
  }
}
