import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DayService } from 'src/app/services/day.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { Day } from 'src/app/Classes/Day';
import { Week } from 'src/app/Classes/Week';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekComponent implements OnInit, OnDestroy {
  @Input() week!: Week;
  @Input() selectedDay!: Day | null;
  @Input() currentDay!: Day | null;

  @Output() onDayInit = new EventEmitter();

  destroy$ = new Subject();
  currentWeek: Week | null = null;

  constructor(
    private weeksService: WeeksService,
  ) {}

  @ViewChild('weekEl') set weekElement(ref: ElementRef) {
    if (ref) {
      this.onDayInit.emit(ref);
    }
  }

  ngOnInit(): void {
    this.weeksService.currentWeek$.pipe(
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
