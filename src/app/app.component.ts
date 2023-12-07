import { Component, OnDestroy, OnInit } from '@angular/core';
import { navigations } from './../helpers/variables';
import { Nav } from './types/nav';
import { NavigationEnd, Router } from '@angular/router';
import { DayService } from './services/day.service';
import { Week } from './Classes/Week';
import { Subject, takeUntil } from 'rxjs';
import { WeeksService } from './services/weeks.service';
import { Day } from './Classes/Day';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  navs: Nav[] = navigations;
  href: string = '';

  weeks: Week[] = [];
  selectedDay: null | Day = null;
  destroy$ = new Subject();

  constructor(
    private router: Router,
    private weeksService: WeeksService,
    private dayService: DayService,
  ) {
    this.router.events.pipe(
      takeUntil(this.destroy$),
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.href = event.url.split('/')[1];
      }
    });
  }

  ngOnInit(): void {
    this.weeksService.weeks$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((weeks) => {
      this.weeks = weeks;
    })

    this.dayService.selectedDay$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((selectedDay) => {
      if (!selectedDay) {
        this.dayService.currentDay$.pipe(
          takeUntil(this.destroy$)
        ).subscribe((currentDay) => {
          this.selectedDay = currentDay;
        })
      } else {
        this.selectedDay = selectedDay;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
