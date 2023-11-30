import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorageServiceService } from './locale-storage-service.service';
import { formatDate, getMaxId } from 'src/helpers/functions';
import { Day } from '../Classes/Day';
import { Week } from '../Classes/Week';
import { DayService } from './day.service';

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

  dayService: DayService | null = null;

  constructor(
    private localeStorage: LocaleStorageServiceService,
    // private dayService: DayService,
  ) {
    this.weeks$$.next(this.localeStorage.getData('weeks') || []);

    if (!this.weeks$$.getValue().length) {
      this.createWeek();
    }

    this.currentWeek$$.next(
      this.weeks$$.getValue().find((week: Week) => {
        console.log(week);
        return week.days.find((day: Day) => day.date === formatDate(new Date()));
      }) || null,
    )
  }

  createDay(date: string, array: any[], weekId: number) {
    const weeks = this.weeks$$.getValue();
    const lastDay = weeks[weeks.length - 1]?.days[weeks[weeks.length - 1].days?.length - 1].id || 0
    return new Day(date, getMaxId(array, lastDay), weekId);
  }

  pickWeek(weekId: number) {
    const currentWeek = this.weeks$$.getValue()
      .find((week: Week) => week.id === weekId) || this.weeks$$.getValue()[0];

    // this.localeStorage.saveData('week', currentWeek);
    this.selectedWeek$$.next(currentWeek);
  }

  setDayService(dayService: DayService) {
    this.dayService = dayService;

    this.currentWeek$.subscribe((currentWeek) => {
      console.log(currentWeek);
      const findedDay = currentWeek?.days
      .find((day) => day.date === formatDate(new Date()))
      || null;
  
      // this.currentDay$$.next(findedDay);
      this.dayService?.onDaySelect(findedDay);
      // this.selectedDay$$.next(findedDay);
    });
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

    const newWeek = new Week(
      newWeekId,
      newDays[0].date, 
      newDays[newDays.length - 1].date,
      newDays,
    )

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
