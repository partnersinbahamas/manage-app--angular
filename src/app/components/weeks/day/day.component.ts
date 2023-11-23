import { AfterContentChecked, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DayService } from 'src/app/services/day.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { Day } from 'src/app/types/day';
import { Todo } from 'src/app/types/todo';
import { getCalendarDay, getMonth } from 'src/helpers/functions';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent implements OnInit {
  @Input() day!: Day;
  @Input('selectedDay') set selectedDay(day: Day | null) {
    this.isSelected = day?.id === this.day.id
      && this.day.weekId === day.weekId;
  };

  destroy$ = new Subject();

  calendarDay: string = '';
  month: string = '';

  isSelected = false;
  isCurrent = false;

  constructor(
    private dayService: DayService,
  ) {}

  ngOnInit(): void {
    this.calendarDay = getCalendarDay(this.day.date);
    this.month = getMonth(this.day.date);

    this.dayService.currentDay$.subscribe((currentDay) => {
      this.isCurrent = currentDay?.id === this.day.id
        && currentDay.weekId === this.day.weekId;
    })
  };

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  onDaySelect(day: Day | null) {
    this.dayService.onDaySelect(day);
  }
}
