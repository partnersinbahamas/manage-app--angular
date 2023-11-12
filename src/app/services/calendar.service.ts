import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorageServiceService } from './locale-storage-service.service';
import { formatDate } from 'src/helpers/functions';

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
}
