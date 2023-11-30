import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DayService } from 'src/app/services/day.service';
import { Day } from 'src/app/Classes/Day';
import { Todo } from 'src/app/types/todo';
import { getCalendarDay, getMonth } from 'src/helpers/functions';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent implements OnInit, AfterViewInit {
  @Input() day!: Day;
  @Input('selectedDay') set selectedDay(day: Day | null) {
    this.isSelected = day?.id === this.day.id
      && this.day.weekId === day.weekId;
  };

  destroy$ = new Subject();

  calendarDay: string = '';
  sel: any = null;
  month: string = '';

  isSelected: boolean = false;
  isCurrent: boolean = false;

  constructor(
    private dayService: DayService,
  ) {}

  ngAfterViewInit(): void {
    this.dayService.selectedDay$.subscribe((d) => {
      this.sel = d;
    })
  }

  ngOnInit(): void {
    this.calendarDay = getCalendarDay(this.day.date);
    this.month = getMonth(this.day.date);

    this.dayService.currentDay$.subscribe((currentDay) => {
      this.isCurrent = currentDay?.id === this.day.id
        && currentDay.weekId === this.day.weekId;
    });
  };

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  onDaySelect(day: Day) {
    if (this.isSelected) {
      this.dayService.onDaySelect(null);
    } else {
      this.dayService.onDaySelect(day);
    }
  }
}
