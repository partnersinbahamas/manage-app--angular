import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WeeksService } from 'src/app/services/weeks.service';
import { Day } from 'src/app/types/day';
import { Todo } from 'src/app/types/todo';
import { formatRelativeDate, getCalendarDay, getMonth } from 'src/helpers/functions';
import { months } from 'src/helpers/variables';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent implements OnInit {
  @Input() day!: Day;

  calendatDay: string = '';
  month: string = '';

  router: string = ''

  ngOnInit(): void {
    this.calendatDay = getCalendarDay(this.day.date);
    this.month = getMonth(this.day.date);

    this.router = `/details/${this.day.weekId}/${this.day.id}`
  };

  trackById(i: number, todo: Todo) {
    return todo.id;
  }
}
