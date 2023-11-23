import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DayService } from 'src/app/services/day.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { Day } from 'src/app/types/day';
import { Week } from 'src/app/types/week';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekComponent implements OnInit, OnDestroy {
  @Input() week!: Week;
  @Output() onDayInit = new EventEmitter();
  destroy$ = new Subject();

  selectedDay: Day | null = null;
  currentWeek: Week | null = null;

  constructor(
    private dayService: DayService,
    private weekService: WeeksService,
  ) {}

  @ViewChild('weekEl') set weekElement(ref: ElementRef) {
    if (ref) {
      this.onDayInit.emit(ref);
    }
  }

  ngOnInit(): void {
    this.dayService.selectedDay$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((selectedDay) => {
      this.selectedDay = selectedDay;
    });

    this.weekService.currentWeek$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((currentWeek) => {
      this.currentWeek = currentWeek;
    });
  }

  trackById(i: number, day: Day) {
    return day.id;
  };

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
