import { Injectable, OnInit } from '@angular/core';
import { Day } from '../Classes/Day';
import { BehaviorSubject, delay, switchMap } from 'rxjs';
import { WeeksService } from './weeks.service';
import { formatDate } from 'src/helpers/functions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DayService implements OnInit {
  private selectedDay$$ = new BehaviorSubject<Day | null>(null);
  private currentDay$$ = new BehaviorSubject<Day | null> (null);

  currentDay$ = this.currentDay$$.asObservable();
  selectedDay$ = this.selectedDay$$.asObservable();

  // selectedDay = this.selectedDay$$.getValue();

  constructor(
    private weeksService: WeeksService,
    private router: Router,
  ) {
  this.weeksService.currentWeek$.subscribe((currentWeek) => {
    console.log(currentWeek);
    const findedDay = currentWeek?.days
    .find((day: Day) => day.date === formatDate(new Date()))
    || null;

    this.currentDay$$.next(findedDay);
    // this.dayService.onDaySelect(findedDay);
    this.selectedDay$$.next(findedDay);
  });
  }

  ngOnInit(): void {
    this.selectedDay$ = this.currentDay$;
  }

  onDaySelect(day: Day | null) {
    this.router.navigate([ day ? '/details' : '/about' ])

    this.selectedDay$$.next(day);
  }
}
