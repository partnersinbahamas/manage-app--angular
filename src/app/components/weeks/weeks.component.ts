
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { DayService } from 'src/app/services/day.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { Week } from 'src/app/Classes/Week';
import { formatDate } from 'src/helpers/functions';


@Component({
  selector: 'app-days',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class WeeksComponent implements OnInit {
  weeks: Week[] = [];

  dayWidth: number = 0;
  weeksShift: number = 0;
  selectedWeek: Week | null = null;

  constructor(
    private weeksService: WeeksService,
    private dayService: DayService,
  ) {}

  trackById(i: number, week: Week) {
    return week.id;
  }

  onDayElementInit(ref: ElementRef): void {
    this.dayWidth = ref.nativeElement.clientWidth;
    const index = this.selectedWeek?.id! - 1;

    const max = (
      (this.weeks.length - 1) * this.dayWidth) + (
        this.weeks.length - 1
      ) * 30;

    this.weeksShift = Math.max(-((this.dayWidth * index) + (index * 30)), -max);
  }

  onWeekUnShift() {
    const shift =  Math.min(this.weeksShift + (this.dayWidth + 30), 0);
    this.weeksShift = shift;

    this.weeksService.pickWeek(
      Math.max(this.selectedWeek?.id! - 1, 1)
      );
  }

  onWeekShift() {
    const max = ((this.weeks.length - 1) * this.dayWidth) + (this.weeks.length - 1) * 30;

    const shift = Math.max(this.weeksShift - (this.dayWidth + 30), -max)
    this.weeksShift = shift;

    this.weeksService.pickWeek(
      Math.min(this.selectedWeek?.id! + 1,
        this.weeks[this.weeks.length - 1].id,
      ),
    );
  }

  onAdd() {
    this.weeksService.createWeek();
  };

  ngOnInit(): void {
    this.weeksService.weeks$
      .subscribe(weeks => {
        this.weeks = weeks
      });

    this.weeksService.selectedWeek$.subscribe((week) => {
      this.selectedWeek = week;
    })

      if (!this.weeks.length) {
        this.onAdd();
      } else {
        const lastWeek = this.weeks[this.weeks.length - 1];

        const currentDate: number = Number(formatDate(new Date()).split('.')[0]);
        const lastDate: number = Number(lastWeek.endTo?.split('.')[0]);

        if (lastDate > currentDate) {
          this.onAdd();
        }
      }

    this.selectedWeek = this.weeks.find((week) => {
      return week.days.find((item) => item.date === formatDate(new Date()));
    }) || this.weeks[0];
    this.weeksService.pickWeek(this.selectedWeek.id);
  }
}
