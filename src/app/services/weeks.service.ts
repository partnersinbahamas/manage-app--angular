import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorageServiceService } from './locale-storage-service.service';
import { formatDate, getMaxId } from 'src/helpers/functions';
import { Day } from '../types/day';
import { Week } from '../types/week';

@Injectable({
  providedIn: 'root'
})
export class WeeksService {
  private weeks$$ = new BehaviorSubject<Week[]>([]);
  private selectedWeek$$ =  new BehaviorSubject<Week | null>(null);
  private currentWeek$$ = new BehaviorSubject<Week | null>(null);

  selectedWeek$ = this.selectedWeek$$.asObservable();
  weeks$ = this.weeks$$.asObservable();
  currentWeek$ = this.currentWeek$$.asObservable();

  constructor(
    private localeStorage: LocaleStorageServiceService,
  ) {
    this.weeks$$.next(this.localeStorage.getData('weeks') || []);

    this.currentWeek$$.next(
      this.weeks$$.getValue().find((week: Week) => {
        return week.days.find((day: Day) => day.date === formatDate(new Date()));
      }) || null,
    );
  }

  createDay(date: string, array: any[], weekId: number) {
    const newDay = {
      id: getMaxId(array),
      date,
      todos: [],
      weekId,
    };

    return newDay;
  }

  pickWeek(weekId: number) {
    const currentWeek = this.weeks$$.getValue()
      .find((week: Week) => week.id === weekId) || this.weeks$$.getValue()[0];

    // this.localeStorage.saveData('week', currentWeek);
    this.selectedWeek$$.next(currentWeek);
  }

  createWeek() {
    const calendar = this.weeks$$.getValue();
    const lastWeekDays = calendar.length > 0 ? calendar[calendar.length - 1].days : [];

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
    const newWeekId: number = getMaxId(this.weeks$$.getValue());

    for (let i = 0; i < 7; i++) {
      const formattedDay = formatDate(new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)));
      
      const newDay = this.createDay(formattedDay, newDays, newWeekId);
      newDays.push(newDay);
    };

    const newWeek: Week = {
      id: newWeekId,
      startFrom: newDays[0].date,
      endTo: newDays[newDays.length - 1].date,
      days: newDays,
    }

    this.weeks$$.next([...calendar, newWeek]);
    this.localeStorage.saveData('weeks', [...calendar, newWeek]);
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
