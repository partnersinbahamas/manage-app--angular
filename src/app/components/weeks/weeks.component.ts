
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DayService } from 'src/app/services/day.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { Week } from 'src/app/Classes/Week';
import { formatDate } from 'src/helpers/functions';
import { Day } from 'src/app/Classes/Day';
import { Subject, take, takeUntil } from 'rxjs';
import { compareDates } from 'src/helpers/functions';


@Component({
  selector: 'app-days',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class WeeksComponent implements OnInit, OnDestroy {
  weeks: Week[] = [];

  destroy$ = new Subject();

  dayWidth: number = 0;
  weeksShift: number = 0;

  selectedWeek: Week | null = null;
  selectedDay: Day | null = null;
  currentDay: Day | null = null;

  constructor(
    private weeksService: WeeksService,
    private dayService: DayService,
  ) {}

  trackById(i: number, week: Week) {
    return week.id;
  }

  onDayElementInit(ref: ElementRef): void {
    this.dayWidth = ref.nativeElement.clientWidth;
    const index = this.selectedWeek?.id! - 1;

    const max = (
      (this.weeks.length - 1) * this.dayWidth) + (
        this.weeks.length - 1
      ) * 30;

    this.weeksShift = Math.max(-((this.dayWidth * index) + (index * 30)), -max);
  }

  onWeekUnShift() {
    const shift =  Math.min(this.weeksShift + (this.dayWidth + 30), 0);
    this.weeksShift = shift;

    this.weeksService.pickWeek(
      Math.max(this.selectedWeek?.id! - 1, 1)
      );
  }

  onWeekShift() {
    const max = ((this.weeks.length - 1) * this.dayWidth) + (this.weeks.length - 1) * 30;

    const shift = Math.max(this.weeksShift - (this.dayWidth + 30), -max)
    this.weeksShift = shift;

    this.weeksService.pickWeek(
      Math.min(this.selectedWeek?.id! + 1,
        this.weeks[this.weeks.length - 1].id,
      ),
    );
  }

  onAdd() {
    this.weeksService.createWeek();
  };

  ngOnInit(): void {
    this.weeksService.weeks$.pipe(takeUntil(this.destroy$))
      .subscribe(weeks => {
        this.weeks = weeks
      });

    this.weeksService.selectedWeek$.pipe(takeUntil(this.destroy$))
      .subscribe((selectedWeek) => {
        this.selectedWeek = selectedWeek;
      });

    this.dayService.selectedDay$.pipe(takeUntil(this.destroy$))
      .subscribe((selectedDay) => {
        this.selectedDay = selectedDay
      })

    this.dayService.currentDay$.pipe(takeUntil(this.destroy$))
      .subscribe((currentDay) => {
        this.currentDay = currentDay;
      });

      if (!this.weeks.length) {
        this.onAdd();
      } else {
        const lastWeek = this.weeks[this.weeks.length - 1];

        const isCreateNewWeek = compareDates(
          formatDate(new Date()),
          lastWeek.endTo,
        );

        if (isCreateNewWeek) {
          this.onAdd();
        }
      }

    this.selectedWeek = this.weeks.find((week) => {
      return week.days.find((item) => item.date === formatDate(new Date()));
    }) || this.weeks[0];
    this.weeksService.pickWeek(this.selectedWeek.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
