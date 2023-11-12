import { Component, Input, OnInit } from '@angular/core';
import { Day } from 'src/app/types/day';
import { formatRelativeDate, getCalendarDay } from 'src/helpers/functions';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit{
  @Input() day!: Day;

  formatedDay: string = '';
  calendatDay: string = '';
  
  constructor() {}

  ngOnInit(): void {
    this.formatedDay = formatRelativeDate(this.day.date);
    this.calendatDay = getCalendarDay(this.day.date);
  }
}
