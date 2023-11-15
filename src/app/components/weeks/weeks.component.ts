
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { Week } from 'src/app/types/week';
import { formatDate } from 'src/helpers/functions';


@Component({
  selector: 'app-days',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss']
})
export class WeeksComponent implements OnInit {
  calendar: Week[] = [];

  dayWidth: number = 0;
  weeksShift: number = 0;

  constructor(
    private calendarService: CalendarService,
  ) {}

  onDayElementInit(ref: ElementRef): void {
    this.dayWidth = ref.nativeElement.clientWidth;
    const index: number = this.calendar.findIndex((item) => {
      return item.days.find((el) => el.date === formatDate(new Date()));
    });

    const max = ((this.calendar.length - 1) * this.dayWidth) + (this.calendar.length - 1) * 30;

    this.weeksShift = Math.max(-((this.dayWidth * index) + (index * 30)), -max);
  }

  onWeekUnShift() {
    const shift =  Math.min(this.weeksShift + (this.dayWidth + 30), 0);
    this.weeksShift = shift;
  }

  onWeekShift() {
    const max = ((this.calendar.length - 1) * this.dayWidth) + (this.calendar.length - 1) * 30;

    const shift = Math.max(this.weeksShift - (this.dayWidth + 30), -max)
    this.weeksShift = shift;

    console.log(max, shift);

  }

  onAdd() {
    this.calendarService.createWeek();
  };

  ngOnInit(): void {
    this.calendarService.calendar$
      .subscribe(calendar => {
        this.calendar = calendar
      });

      if (!this.calendar.length) {
        this.onAdd();
      } else {
        const lastWeek = this.calendar[this.calendar.length - 1];

        const currentDate: number = Number(formatDate(new Date()).split('.')[0]);
        const lastDate: number = Number(lastWeek.endTo?.split('.')[0]);

        if (currentDate > lastDate) {
          this.onAdd();
        }
      }
  }
}
