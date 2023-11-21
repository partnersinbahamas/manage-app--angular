import { AfterContentChecked, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DayService } from 'src/app/services/day.service';
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
  destroy$ = new Subject();

  calendarDay: string = '';
  month: string = '';
  router: string = '';

  isSame = new BehaviorSubject<any>(null);

  constructor(
    private dayService: DayService,
  ) {}

  ngOnInit(): void {
    this.calendarDay = getCalendarDay(this.day.date);
    this.month = getMonth(this.day.date);

    this.router = `/details/${this.day.weekId}/${this.day.id}`;

    this.dayService.selectedDay$.subscribe((sd) => {
      this.isSame.next(sd?.id === this.day.id);
    })
  };

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  onDaySelect(day: Day | null) {
    this.dayService.onDaySelect(day);
  }


  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
