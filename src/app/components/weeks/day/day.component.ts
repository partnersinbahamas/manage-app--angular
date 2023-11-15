import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Day } from 'src/app/types/day';
import { Todo } from 'src/app/types/todo';
import { formatRelativeDate, getCalendarDay } from 'src/helpers/functions';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() day!: Day;
  // @Output() onDayInit = new EventEmitter<ElementRef>();

  formatedDay: string = '';
  calendatDay: string = '';

  // @ViewChild('dayEl') set dayElement(ref: ElementRef) {
  //   if (ref) {
  //     this.onDayInit.emit(ref);
  //   }
  // };
  
  constructor() {}

  ngOnInit(): void {
    this.formatedDay = formatRelativeDate(this.day.date);
    this.calendatDay = getCalendarDay(this.day.date);
  };

  trackById(i: number, todo: Todo) {
    return todo.id;
  }
}
