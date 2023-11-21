import { Injectable } from '@angular/core';
import { Day } from '../types/day';
import { BehaviorSubject } from 'rxjs';
import { WeeksService } from './weeks.service';
import { formatDate } from 'src/helpers/functions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  private selectedDay$$ = new BehaviorSubject<Day | null>(null);
  private currentDay$$ = new BehaviorSubject<Day | null> (null);

  currentDay$ = this.currentDay$$.asObservable();
  selectedDay$ = this.selectedDay$$.asObservable();

  constructor(
    private weeksService: WeeksService,
    private router: Router,
  ) {
    this.weeksService.currentWeek$.subscribe((currentWeek) => {
      this.currentDay$$.next(
        currentWeek?.days
          .find((day) => day.date === formatDate(new Date()))
          || null,
      )
    });
  }

  onDaySelect(day: Day | null) {
    this.router.navigate([ day ? '/details' : '/about' ])

    console.log('day on click: ', day)
    this.selectedDay$$.next(day);
  }
}
