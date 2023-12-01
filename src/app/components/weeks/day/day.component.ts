import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
export class DayComponent implements OnInit {
  @Input() day!: Day;

  @Input('selectedDay') set selectedDay(day: Day | null) {
    this.isSelected = day?.id === this.day.id && day?.weekId === this.day.weekId
  };

  @Input('currentDay') set currentDay(day: Day | null) {
    this.isCurrent = day?.id === this.day.id && day.weekId === this.day.weekId;
  }

  calendarDay: string = '';
  month: string = '';

  isSelected: boolean = false;
  isCurrent: boolean = false;

  constructor(
    private dayService: DayService,
  ) {}

  ngOnInit(): void {
    this.calendarDay = getCalendarDay(this.day.date);
    this.month = getMonth(this.day.date);
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
